#!/usr/bin/env python3
"""Reconstruct the pinned final source from actual Git blame commits.

Real evidence: final-line provenance and upstream commit order/metadata.
Simulated: typing minute, mkdir/touch/save/stage commands, order WITHIN a commit.
Historical deletions are excluded deliberately; this is a surviving-lines replay.
"""
import collections
import json
import pathlib
import re
import subprocess
import sys

BASE = pathlib.Path("github-timestamps/petclinic")
PIN = "500158f732419217507c7656904b8e6aa1bcc0d6"
TARGET = 10580

def git(repo, *args):
    return subprocess.check_output(["git", "-C", str(repo), *args], stderr=subprocess.PIPE).decode("utf-8", "replace")

def quote(s):
    return "'" + str(s).replace("'", "'\\''") + "'"

def blame(repo, path, expected):
    raw = git(repo, "blame", "--line-porcelain", "--follow", PIN, "--", path)
    shas = []
    for line in raw.splitlines():
        if line.startswith("\t"):
            continue
        m = re.match(r"^(\^?[0-9a-f]{40})\s+\d+\s+\d+(?:\s+\d+)?$", line)
        if m:
            shas.append(m.group(1).lstrip("^"))
    # --line-porcelain produces one header per final source line, not just each hunk.
    if len(shas) != expected:
        raise RuntimeError(f"{path}: blamed {len(shas)} but expected {expected} lines")
    return shas

def priority(path):
    p=path.lower()
    if p.endswith(("pom.xml","build.gradle","settings.gradle")):return 0
    if p.endswith(("baseentity.java","namedentity.java","person.java","owner.java","pet.java","visit.java","vet.java")):return 1
    if "repository" in p:return 2
    if "validator" in p or "formatter" in p:return 3
    if "controller" in p:return 4
    if "templates/" in p:return 5
    if "test/" in p:return 6
    return 7

def main(repo):
    if git(repo, "rev-parse", "HEAD").strip()!=PIN:
        raise RuntimeError("Wrong PetClinic source revision")
    baseline=json.loads((BASE/"data/manifest.json").read_text())
    sources=json.loads((BASE/"data/sources.json").read_text())
    if len(baseline["files"])!=132 or len(sources)!=118 or baseline["metrics"]["sourceLines"]!=8957:
        raise RuntimeError("Pinned source inventory mismatch")
    commits=git(repo, "rev-list", "--topo-order", "--reverse", PIN).splitlines()
    order={sha:i for i,sha in enumerate(commits)}
    metadata={}
    for line in git(repo, "log", "--format=%H%x09%aI%x09%s", PIN).splitlines():
        parts=line.split("\t",2)
        if len(parts)==3:metadata[parts[0]]=(parts[1],parts[2])
    files=[dict(f,createdAt=-1,finishedAt=-1,lineSteps=[-1]*len(sources.get(f["path"],[]))) for f in baseline["files"]]
    by_path={f["path"]:f for f in files}
    grouped=collections.defaultdict(lambda: collections.defaultdict(list))
    for f in files:
        if f["kind"]!="text":continue
        path=f["path"]
        for i,sha in enumerate(blame(repo,path,len(sources[path]))):
            if sha not in order:raise RuntimeError(f"Blame SHA not in pinned ancestry: {sha} at {path}:{i+1}")
            grouped[sha][path].append(i)
    # Generated and binary assets cannot be line-blamed; associate with latest touching commit.
    for f in files:
        if f["kind"]=="text":continue
        sha=git(repo,"log","-1","--format=%H",PIN,"--",f["path"]).strip()
        if not sha or sha not in order:sha=commits[0]
        grouped[sha][f["path"]]=[]
    chronological=sorted(grouped,key=lambda sha:order[sha])
    total_blame=sum(len(lines) for group in grouped.values() for lines in group.values())
    if total_blame!=8957:raise RuntimeError(f"Coverage mismatch: {total_blame}")
    events=[]
    known_dirs=set()
    def emit(kind, **kw):
        events.append(dict(kind=kind, **kw))
        return len(events)-1
    emit("terminal",command="mkdir spring-petclinic",label="Prepare project folder · reconstructed")
    emit("terminal",command="cd spring-petclinic",label="Enter repository · reconstructed")
    emit("terminal",command="git init -b main",label="Initialize local Git · reconstructed")
    phases=[]
    for sha in chronological:
        subset=grouped[sha]
        changed=sorted(subset,key=lambda p:(priority(p),p))
        commit_index=len(phases)
        start=len(events)
        date,subject=metadata.get(sha,("","Unknown upstream commit"))
        changes=[]
        for path in changed:
            f=by_path[path]
            if f["createdAt"]<0:
                parent=path.rpartition("/")[0]
                if parent:
                    # Group folder creation into a single realistic command per new parent.
                    new=[]
                    parts=parent.split("/")
                    for i in range(1,len(parts)+1):
                        d="/".join(parts[:i])
                        if d not in known_dirs:known_dirs.add(d);new.append(d)
                    if new:
                        emit("terminal",command="mkdir -p "+quote(parent),commit=commit_index,
                             label="Create directories · reconstructed")
                if f["kind"]=="text":
                    f["createdAt"]=emit("terminal",file=path,command="touch "+quote(path),
                                          commit=commit_index,label="Create file · inferred")
                else:
                    f["createdAt"]=emit("terminal",file=path,
                       command="cp "+quote("starter-assets/"+path.split("/")[-1])+" "+quote(path),
                       commit=commit_index,label="Import or generate asset · reconstructed",
                       output="Asset bytes are not replayed as handwritten code")
            indices=sorted(subset[path])
            for i in indices:
                step=emit("add",file=path,line=i,commit=commit_index,upstreamSHA=sha,
                         label="Source line last attributed to "+sha[:12])
                f["lineSteps"][i]=step
                f["finishedAt"]=step
            ranges=[]
            for i in indices:
                if ranges and ranges[-1]["to"]==i:ranges[-1]["to"]=i+1
                else:ranges.append({"from":i+1,"to":i+1})
            changes.append({"file":path,"added":len(indices),"lineRanges":ranges})
        emit("terminal",command="git add -A",commit=commit_index,
             label="Stage upstream change · reconstructed")
        emit("terminal",command="git commit -m "+quote(subject),commit=commit_index,
             upstreamSHA=sha,label="Commit "+sha[:12]+" · real upstream reference",
             output="Reference: https://github.com/spring-projects/spring-petclinic/commit/"+sha+
                 " (simulated local command, NOT executed)")
        phases.append(dict(id=commit_index+1,title=subject,sha=sha,date=date,
           url="https://github.com/spring-projects/spring-petclinic/commit/"+sha,
           mode="Real Git-blame provenance",fromStep=start,toStep=len(events)-1,
           totalLines=sum(len(subset[p]) for p in changed),filesChanged=len(changed),
           files=changed,changes=changes))
    emit("terminal",command="git status --short",label="Review final workspace · reconstructed",
         output="Final pinned source reconstructed without deletion replay")
    # If original 10,580 action limit is tight, preserve real Git commits before stage cosmetics.
    excess=len(events)-TARGET
    if excess>0:
        for kind in ("terminal",):
            i=len(events)-1
            while i>=0 and excess>0:
                e=events[i]
                if e["kind"]==kind and e.get("command")=="git add -A":
                    events.pop(i);excess-=1
                i-=1
        if excess:raise RuntimeError(f"Historical commits exceed {TARGET} target actions by {excess}")
    # Append virtual editor saves to reach exact original action count.
    missing=TARGET-len(events)
    adds=[i for i,e in enumerate(events) if e["kind"]=="add"]
    if missing>len(adds):raise RuntimeError(f"Insufficient code actions for {missing} save events")
    if missing:
        marks=set()
        for k in range(missing):
            marks.add(adds[((k+1)*len(adds))//(missing+1)])
        if len(marks)!=missing:raise RuntimeError("Save-distribution indices collided")
        expanded=[]
        for i,e in enumerate(events):
            expanded.append(e)
            if i in marks:
                expanded.append({"kind":"save","file":e["file"],"commit":e["commit"],
                                 "label":"Save editor buffer · reconstructed"})
        events=expanded
    if len(events)!=TARGET:raise RuntimeError("Minute count mismatch")
    # Reindex source-line provenance to event positions AFTER inserting simulated saves.
    for f in files:f["lineSteps"]=[-1]*len(f["lineSteps"]);f["createdAt"]=-1;f["finishedAt"]=-1
    for phase in phases:phase["fromStep"]=-1;phase["toStep"]=-1
    for step,e in enumerate(events):
        ci=e.get("commit")
        if ci is not None:
            p=phases[ci]
            if p["fromStep"]<0:p["fromStep"]=step
            p["toStep"]=step
        path=e.get("file")
        if path and (e.get("created",False) or (e["kind"]=="terminal" and
             (e.get("command","").startswith("touch ") or e.get("command","").startswith("cp ")))):
            if by_path[path]["createdAt"]<0:by_path[path]["createdAt"]=step
        if e["kind"]=="add":
            f=by_path[path]
            if f["lineSteps"][e["line"]]>=0:raise RuntimeError("Duplicate line attribution")
            f["lineSteps"][e["line"]]=step;f["finishedAt"]=step
    for f in files:
        if f["createdAt"]<0:raise RuntimeError("File missing creation "+f["path"])
        if f["kind"]=="text" and (-1 in f["lineSteps"] or len(f["lineSteps"])!=f["totalLines"]):
            raise RuntimeError("Source-line coverage failure "+f["path"])
        f["chronologicalSteps"]=sorted(f["lineSteps"])
        f["finishedAt"]=max(f["finishedAt"],f["createdAt"])
    # Some additional terminal events before first historic commit do not belong to a commit.
    metrics=dict(baseline["metrics"],steps=len(events),terminalSteps=sum(e["kind"]=="terminal" for e in events),
                 saveSteps=sum(e["kind"]=="save" for e in events),sourceLines=total_blame,
                 deletionSteps=0,realCommits=len(phases),historyAttributedLines=total_blame,
                 historyCoveragePct=100.0)
    replay=dict(project=baseline["project"],origin=baseline["origin"],sourceSHA=PIN,
        mode="upstream-git-blame-surviving-lines",startMinute=baseline["startMinute"],
        note="Upstream SHA and final-line Git blame are real. Minute clock, typing order within commits and terminal commands are inferred. Deleted historical lines excluded.",
        metrics=metrics,files=files,phases=phases,events=events)
    out=BASE/"data/history-manifest.json"
    out.write_text(json.dumps(replay,separators=(",",":"),ensure_ascii=False),encoding="utf8")
    print("HISTORY AUDIT PASSED",json.dumps({k:metrics[k] for k in
      ["steps","sourceLines","realCommits","terminalSteps","saveSteps","historyCoveragePct"]}))
    print("First commit",phases[0]["sha"],phases[0]["title"])
    print("Last commit",phases[-1]["sha"],phases[-1]["title"])

if __name__=="__main__":
    if len(sys.argv)!=2:raise SystemExit("Usage: build_history.py /path/to/pinned/petclinic")
    main(pathlib.Path(sys.argv[1]))

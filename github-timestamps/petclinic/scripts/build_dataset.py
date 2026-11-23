#!/usr/bin/env python3
"""Build a deterministic, from-scratch teaching replay from a pinned PetClinic tree.

This is NOT the historical keystroke or terminal history of Spring PetClinic.
Only committed source text is real; the build sequence and commands are simulated.
"""
import bisect
import json
import pathlib
import subprocess
import sys

PIN = "500158f732419217507c7656904b8e6aa1bcc0d6"
OUT = pathlib.Path("github-timestamps/petclinic/data")
START_MINUTE = 9 * 60
SAVE_EVERY = 8
MIN_STEPS, MAX_STEPS = 10000, 11000

def run(repo, *cmd):
    return subprocess.check_output(["git", "-C", str(repo), *cmd])

def shquote(s):
    return "'" + s.replace("'", "'\\''") + "'"

def is_asset(path):
    lower = path.lower()
    return (
        lower == "src/main/resources/static/resources/css/petclinic.css"
        or lower.startswith("src/main/resources/static/resources/fonts/")
        or pathlib.PurePosixPath(lower).suffix in {".jar", ".png", ".eot", ".ttf", ".woff", ".woff2"}
    )

def category(p):
    if p == "pom.xml": return 0
    if p in {"build.gradle", "settings.gradle"}: return 1
    if p.endswith("PetClinicApplication.java"): return 2
    if p.startswith("src/main/java/"):
        if "/model/" in p: return 3
        if "/owner/" in p: return 4
        if "/vet/" in p: return 5
        if "/system/" in p: return 6
        return 7
    if p.startswith("src/main/resources/db/"): return 8
    if p.startswith("src/main/resources/application"): return 9
    if p.startswith("src/main/resources/messages/"): return 10
    if p.startswith("src/main/resources/templates/"): return 11
    if p.startswith("src/main/scss/"): return 12
    if p.startswith("src/test/java/"): return 13
    if p.startswith("src/test/"): return 14
    if p.startswith("src/main/resources/"): return 15
    if p.startswith(".github/"): return 18
    return 16

def language(path):
    ext = pathlib.PurePosixPath(path).suffix.lower()
    return {
        ".java": "java", ".xml": "xml", ".html": "html",
        ".scss": "scss", ".css": "css", ".sql": "sql",
        ".properties": "properties", ".yml": "yaml", ".yaml": "yaml",
        ".json": "json", ".py": "python", ".gradle": "gradle",
        ".md": "markdown", ".sh": "shell"
    }.get(ext, "text")

def main(repo):
    assert run(repo, "rev-parse", "HEAD").decode().strip() == PIN, "Wrong PetClinic revision"
    raw = run(repo, "ls-tree", "-r", "-z", "--name-only", "HEAD")
    paths = [p.decode("utf-8") for p in raw.split(b"\0") if p]
    assert len(paths) == len(set(paths)) == 132, "Unexpected tracked file inventory"
    paths.sort(key=lambda p: (category(p), p))
    sources = {}
    events = []
    files = []
    phases = []
    known_dirs = set()
    count_lines = 0
    def emit(kind, **kwargs):
        events.append(dict(kind=kind, **kwargs))
        return len(events) - 1
    emit("terminal", command="mkdir spring-petclinic", label="Create project directory")
    emit("terminal", command="cd spring-petclinic", label="Enter project directory")
    emit("terminal", command="git init -b main", label="Initialize Git repository",
         output="Initialized empty Git repository (simulated)")
    for ordinal, path in enumerate(paths, start=1):
        path_obj = pathlib.Path(repo) / path
        assert path_obj.is_file(), "Missing tracked source file: " + path
        parent = pathlib.PurePosixPath(path).parent
        if str(parent) != ".":
            chunks = str(parent).split("/")
            for i in range(1, len(chunks) + 1):
                d = "/".join(chunks[:i])
                if d not in known_dirs:
                    known_dirs.add(d)
                    emit("terminal", command="mkdir -p " + shquote(d), label="Create directory")
        phase = ordinal - 1
        start = len(events)
        if is_asset(path):
            label = "Generate stylesheet from SCSS" if path.endswith("/petclinic.css") else "Import existing asset"
            command = ("./mvnw package" if path.endswith("/petclinic.css") else
                       "cp " + shquote("starter-assets/" + pathlib.PurePosixPath(path).name) +
                       " " + shquote(path))
            at = emit("terminal", file=path, command=command, label=label, commit=phase)
            meta = dict(path=path, language=language(path), kind="asset",
                        createdAt=at, lineSteps=[], totalLines=0,
                        phase=phase, generated=path.endswith("/petclinic.css"))
            # Binary assets are not recreated as fictitious source lines.
        else:
            data = path_obj.read_bytes()
            assert b"\0" not in data, "Unexpected binary text file: " + path
            text = data.decode("utf-8")
            normalized = text.replace("\r\n", "\n")
            lines = normalized.split("\n")
            if normalized.endswith("\n"):
                lines.pop()
            assert "\n".join(lines) + ("\n" if normalized.endswith("\n") else "") == normalized, "Lossy line parsing: " + path
            sources[path] = lines
            count_lines += len(lines)
            created = emit("terminal", file=path, command="touch " + shquote(path),
                           label="Create source file", commit=phase)
            line_steps = []
            for i, line in enumerate(lines):
                step = emit("add", file=path, line=i, commit=phase, label="Write source line")
                line_steps.append(step)
                if (i + 1) % SAVE_EVERY == 0:
                    emit("save", file=path, commit=phase, label="Save current file")
            if lines and len(lines) % SAVE_EVERY:
                emit("save", file=path, commit=phase, label="Save completed file")
            meta = dict(path=path, language=language(path), kind="text",
                        createdAt=created, lineSteps=line_steps,
                        totalLines=len(lines), phase=phase)
        emit("terminal", command="git add -- " + shquote(path),
             label="Stage completed file", commit=phase)
        emit("terminal", command="git commit -m " + shquote("Build " + pathlib.PurePosixPath(path).name),
             output="Simulated learning checkpoint (not an original PetClinic commit)",
             label="Create build checkpoint", commit=phase)
        meta["finishedAt"] = len(events)-1
        files.append(meta)
        phases.append(dict(id=ordinal, title="Build " + pathlib.PurePosixPath(path).name,
                           file=path, fromStep=start, toStep=len(events)-1,
                           totalLines=meta["totalLines"], mode="Ideal build"))
    emit("terminal", command="git status --short", label="Verify working tree",
         output="Clean after simulated checkpoints")
    emit("terminal", command="./mvnw test", label="Run project tests",
         output="Test execution shown as a planned development action; not executed in this replay")
    assert len(files) == 132
    assert len(sources) == 118, "Unexpected number of editable source files"
    assert count_lines == 8957, "Unexpected source line inventory: " + str(count_lines)
    assert MIN_STEPS <= len(events) <= MAX_STEPS, "Outside requested step range: " + str(len(events))
    assert sum(f["totalLines"] for f in files) == count_lines
    assert sum(1 for e in events if e["kind"] == "add") == count_lines
    assert sum(1 for e in events if e["kind"] in {"strike", "remove", "delete"}) == 0
    assert all(f["lineSteps"] == sorted(f["lineSteps"]) for f in files)
    manifest = {
        "project": "Spring PetClinic", "origin": "spring-projects/spring-petclinic",
        "sourceSHA": PIN, "mode": "ideal-from-scratch", "startMinute": START_MINUTE,
        "note": "Teaching reconstruction; the commands, typing order, save actions and checkpoints are simulated. Not real historical work.",
        "metrics": {
            "steps": len(events), "sourceLines": count_lines,
            "editableFiles": len(sources), "files": len(files),
            "assetFiles": len(files)-len(sources),
            "deletionSteps": 0,
            "terminalSteps": sum(e["kind"] == "terminal" for e in events),
            "saveSteps": sum(e["kind"] == "save" for e in events)
        },
        "files": files, "phases": phases, "events": events
    }
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT/"manifest.json").write_text(json.dumps(manifest, separators=(",", ":"), ensure_ascii=False), encoding="utf-8")
    (OUT/"sources.json").write_text(json.dumps(sources, separators=(",", ":"), ensure_ascii=False), encoding="utf-8")
    check = json.loads((OUT/"manifest.json").read_text(encoding="utf-8"))
    original = json.loads((OUT/"sources.json").read_text(encoding="utf-8"))
    assert len(check["events"]) == len(events) and original == sources
    print("AUDIT PASSED: {steps:,} steps, {lines:,} real text lines, {files} files, {assets} imported/generated assets, ZERO deletes"
          .format(steps=len(events), lines=count_lines, files=len(files), assets=len(files)-len(sources)))
    print("Timed replay: first=D01 09:00 last minute offset=" + str(START_MINUTE + len(events) - 1))

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: build_dataset.py /path/to/pinned/spring-petclinic")
    main(pathlib.Path(sys.argv[1]))

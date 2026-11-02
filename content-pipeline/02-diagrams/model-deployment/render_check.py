import xml.etree.ElementTree as ET
from pathlib import Path
p=Path(__file__).resolve().parent
for n in ['hero.svg']+[f'layer-{i}.svg' for i in range(1,8)]:
 r=ET.parse(p/n).getroot();ns='{http://www.w3.org/2000/svg}'
 assert r.tag==ns+'svg' and r.get('role')=='img' and r.get('viewBox')=='0 0 1000 430'
 assert r.find(ns+'title') is not None and r.find(ns+'desc') is not None
 ids=[v.get('id') for v in r.iter() if v.get('id')];assert len(ids)==len(set(ids))
 print('PASS',n)

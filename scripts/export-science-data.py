"""Export user-supplied research data as dependency-free, self-contained web assets."""
import csv,json,math
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
raw=ROOT/'WPEMfitting'
def pairs(path):
    return [[float(v) for v in row[:2]] for row in csv.reader(path.open())]
observed=pairs(raw/'intensity.csv')
# Use the 10:11 run: its fractions and Rp/Rwp match the technical report.
# DecomposedComponents contains the later 17:05 run and must not be mixed in.
run=raw/'WPEMFittingResults'
suffix='2026.2.8_10.11'
series=[pairs(run/f'WPEMfittingProfile_{suffix}.csv'),pairs(run/f'upbackground_{suffix}.csv')]
assert all(len(s)==len(observed) for s in series)
assert all(abs(r[0]-observed[i][0])<1e-7 for s in series for i,r in enumerate(s))
def profile(x,peaks):
    # Normalized Gaussian / Lorentzian mixture. Verified against the supplied
    # phase_1.csv with its matching System0.csv parameters before use here.
    return sum(w*(alpha*g/math.pi/((x-mu)**2+g*g)+(1-alpha)*math.exp(-(x-mu)**2/(2*v))/math.sqrt(2*math.pi*v)) for w,alpha,mu,g,v in peaks)
for i in range(5):
    params=list(csv.DictReader((run/f'CrystalSystem{i}_WPEMout_{suffix}.csv').open()))
    peaks=[[float(r[k]) for k in ['wi','Ai','mu_i','L_gamma_i','G_sigma2_i']] for r in params]
    series.append([[x,profile(x,peaks)] for x,_ in observed])
assert all(math.isfinite(v) for s in [observed]+series for r in s for v in r)
rp=100*sum(abs(o[1]-f[1]) for o,f in zip(observed,series[0]))/sum(o[1] for o in observed)
rwp=100*math.sqrt(sum((o[1]-f[1])**2/o[1] for o,f in zip(observed,series[0]))/sum(o[1] for o in observed))
assert abs(rp-6.600097)<1e-5 and abs(rwp-13.079097)<1e-5
phases=[('CaSO₄·2H₂O','石膏','Gypsum',12.53,'#76a9ff'),('Pb₂Cl₂CO₃','碳氯铅矿','Phosgenite',18.53,'#77f6d2'),('PbCO₃','白铅矿','Cerussite',32.02,'#ffab91'),('PbS','方铅矿','Galena',9.69,'#c7df8d'),('PbOHCl','氯羟铅矿','Laurionite',27.23,'#b889ff')]
phase_data=[]
for i,(formula,zh,en,fraction,color) in enumerate(phases):
    positions=sorted(set(float(r['mu_i']) for r in csv.DictReader((run/f'CrystalSystem{i}_WPEMout_{suffix}.csv').open())))
    phase_data.append(dict(formula=formula,zh=zh,en=en,fraction=fraction,color=color,peaks=[round(v,5) for v in positions]))
d=dict(source='WPEMfitting/intensity.csv and WPEMFittingResults/*2026.2.8_10.11.csv; component curves reconstructed from per-phase exported peak parameters; total fit used verbatim, not reconstructed; phase order from Plot.ipynb; fractions from matching mass-fraction file',rp=rp,rwp=rwp,columns=['angle','observed','calculated','background','phase1','phase2','phase3','phase4','phase5'],phases=phase_data,rows=[[round(r[0],4),r[1]]+[round(s[i][1],4) for s in series] for i,r in enumerate(observed)])
out=ROOT/'assets/science/egypt-data.js';out.write_text('window.egyptData = '+json.dumps(d,ensure_ascii=False,separators=(',',':'))+';\n')
# Values transcribed from the report's two benchmark tables. Order: MP500, RRUFF, opXRD.
bench=dict(source='A science agent for diffraction: tab:xrdbench-single and tab:xrdbench-multi',datasets=['MP500','RRUFF','opXRD'],single={
'Gan Jiang':[[96.30,81.78,40.83],[99.90,92.16,48.93]],'AutoXRD':[[58,58.47,26.45],[96.20,88.67,44.04]],'Uni3DAR':[[.02,0,0],[29.24,9.22,2.91]],'PXRDGen-Flow':[[.01,0,0],[18.79,4.58,.66]],'XtalNet-HMOF100':[[0,0,0],[0,0,0]]},multiF1={
'Gan Jiang':[[66.98,56.23,27.04],[91.61,78.56,38.21]],'AutoXRD':[[43.24,41.07,15.31],[81.75,68.17,30.55]],'AutoAnalyzer':[[51.12,53.78,20.14],[69.25,70.13,27.02]],'SimonnetCNN':[[25.06,32.34,6.91],[25.72,33.33,7.79]]},multiExact={
'Gan Jiang':[[22.80,15.90,3.10],[69.70,38.20,8.20]],'AutoXRD':[[15.80,13.80,1.30],[59,35.10,5.20]],'AutoAnalyzer':[[1.70,6.40,0],[23.37,20.03,1.70]],'SimonnetCNN':[[1.27,2.13,.07],[1.60,2.47,.13]]})
(ROOT/'assets/science/benchmark-data.js').write_text('window.benchmarkData = '+json.dumps(bench,separators=(',',':'))+';\n')
print(f'Exported {len(observed)} aligned points, five phases, and benchmark tables ({out.stat().st_size:,} bytes).')

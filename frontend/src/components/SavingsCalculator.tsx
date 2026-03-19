import { useState } from 'react';
import { Calculator, ArrowRight, TrendingDown, MousePointer2 } from 'lucide-react';
import { calculateSavingsData } from '../utils/costEngine';

interface SavingsCalculatorProps {
  activeTip: any;
}

const SavingsCalculator = ({ activeTip }: SavingsCalculatorProps) => {
  const [hours, setHours] = useState(720); 
  const [usage, setUsage] = useState(100);

  const data = calculateSavingsData(activeTip, hours, usage);

  if (!activeTip || !data) {
    return (
      <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-3xl p-12 mb-10 text-center animate-in fade-in duration-500 font-sans">
        <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700">
          <Calculator className="text-slate-600" size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-300 tracking-tight">Calculator Idle</h2>
        <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
          Select an optimization pattern from the library below to analyze your workload.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
          <MousePointer2 size={14} /> Click the $ icon on a tip
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border-2 border-blue-500/20 rounded-3xl p-8 mb-10 shadow-2xl relative overflow-hidden animate-in zoom-in duration-300 font-sans">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/40">
            <Calculator className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight leading-none">
            Impact Analysis: <span className="text-blue-400">{activeTip.title}</span>
          </h2>
        </div>
        <div className="bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full border border-green-500/20 text-xs font-black flex items-center gap-2 w-fit">
          <TrendingDown size={16} /> {data.percentSaved}% PROJECTED SAVINGS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

        {(data.isTime || data.isHybrid) && (
          <div className="lg:col-span-3 space-y-2 animate-in slide-in-from-left duration-300">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              Monthly Uptime <span className="text-blue-500/50">(Hrs)</span>
            </label>
            <input 
              type="number" 
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all tabular-nums"
            />
          </div>
        )}

        {(data.isVolume || data.isHybrid) && (
          <div className="lg:col-span-3 space-y-2 animate-in slide-in-from-left duration-300">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              Monthly {activeTip.unitLabel || "Usage"} <span className="text-blue-500/50">(Units)</span>
            </label>
            <input 
              type="number" 
              value={usage}
              onChange={(e) => setUsage(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all tabular-nums"
            />
          </div>
        )}

        <div className={`flex items-center gap-4 ${
          data.isHybrid ? 'lg:col-span-6' : (data.isTime || data.isVolume ? 'lg:col-span-9' : 'lg:col-span-12')
        }`}>
          <div className="flex-1 bg-slate-900/50 p-5 rounded-2xl border border-slate-700/50">
            <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Standard Cost</p>
            <p className="text-xl font-bold text-white tracking-tight tabular-nums">${data.oldTotal.toFixed(2)}</p>
          </div>
          
          <ArrowRight className="text-slate-700 shrink-0" size={20} />
          
          <div className="flex-1 bg-blue-600/10 p-5 rounded-2xl border border-blue-600/30">
            <p className="text-[9px] text-blue-400 font-black uppercase mb-1">Optimized Cost</p>
            <p className="text-xl font-bold text-white tracking-tight tabular-nums">${data.newTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-baseline gap-2">
        <div className="space-y-1">
          <span className="text-slate-400 text-sm font-medium">Estimated Monthly Cost Reduction:</span>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            Based on {activeTip.calculationType} pricing model
          </p>
        </div>
        <span className="text-5xl font-black text-green-400 tracking-tighter leading-none animate-in fade-in zoom-in duration-500 tabular-nums">
          ${data.savings}
        </span>
      </div>
    </div>
  );
};

export default SavingsCalculator;
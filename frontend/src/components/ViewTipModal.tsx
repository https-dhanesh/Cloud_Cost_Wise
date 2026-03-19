import { X, Info } from 'lucide-react';

const ViewTipModal = ({ tip, isOpen, onClose }: any) => {
  if (!isOpen || !tip) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex justify-between items-start bg-slate-800/50">
          <div>
            <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">{tip.category}</span>
            <h2 className="text-2xl font-black text-white mt-2 leading-tight">{tip.title}</h2>
            <p className="text-blue-500 text-xs font-bold mt-1 tracking-widest uppercase">Target Service: {tip.serviceName}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-2 bg-slate-900 rounded-full transition-colors"><X size={20} /></button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
            <h4 className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Pricing Architecture</h4>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <p className="text-[10px] text-slate-500 mb-1 font-black uppercase">Legacy Rate</p>
                    <p className="text-white font-bold tracking-tight">${tip.oldFixedRate?.toFixed(3)}/hr + ${tip.oldVarRate?.toFixed(3)}/unit</p>
                </div>
                <div>
                    <p className="text-[10px] text-green-500 mb-1 font-black uppercase">Optimized Rate</p>
                    <p className="text-white font-bold tracking-tight">${tip.newFixedRate?.toFixed(3)}/hr + ${tip.newVarRate?.toFixed(3)}/unit</p>
                </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Info size={16} className="text-blue-500" /> Optimization Strategy</h3>
            <div className="text-slate-300 leading-relaxed text-base whitespace-pre-wrap">{tip.description}</div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-700 bg-slate-900/30 text-right">
          <button onClick={onClose} className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all">Close Details</button>
        </div>
      </div>
    </div>
  );
};

export default ViewTipModal;
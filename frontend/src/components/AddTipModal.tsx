import React, { useState } from 'react';
import API from '../api';
import { X, PlusCircle, CheckCircle } from 'lucide-react';

interface AddTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddTipModal = ({ isOpen, onClose, onSuccess }: AddTipModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    serviceName: '',
    category: 'Compute',
    description: '',
    calculationType: 'TIME',
    unitLabel: 'Hrs/Mo',
    oldFixedRate: 0,
    newFixedRate: 0,
    oldVarRate: 0,
    newVarRate: 0
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/tips', formData);
      onSuccess();
      onClose();
      setFormData({
        title: '', serviceName: '', category: 'Compute', description: '',
        calculationType: 'TIME', unitLabel: 'Hrs/Mo',
        oldFixedRate: 0, newFixedRate: 0, oldVarRate: 0, newVarRate: 0
      });
    } catch (err) {
      alert("Submission failed. Check your network or backend schema.");
    }
  };

  const showFixed = formData.calculationType === 'TIME' || formData.calculationType === 'HYBRID';
  const showVariable = formData.calculationType === 'VOLUME' || formData.calculationType === 'HYBRID';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200 flex flex-col max-h-[90vh]">

        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <PlusCircle className="text-blue-500" size={24} /> Register Optimization Pattern
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">

          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tip Title</label>
            <input 
              required 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 mt-1 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g. NAT Gateway to Instance Swap"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 mt-1 text-white outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>Compute</option>
                <option>Storage</option>
                <option>Networking</option>
                <option>Database</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Service</label>
              <input 
                required 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 mt-1 text-white outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. AWS VPC"
                onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-blue-600/5 p-5 rounded-2xl border border-blue-600/20 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pricing Model</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 mt-1 text-white outline-none cursor-pointer"
                  value={formData.calculationType}
                  onChange={(e) => setFormData({...formData, calculationType: e.target.value})}
                >
                  <option value="TIME">Time-Based (Hourly)</option>
                  <option value="VOLUME">Volume-Based (Workload)</option>
                  <option value="HYBRID">Hybrid (Fixed + Var)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Unit Label</label>
                <input 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 mt-1 text-white outline-none"
                  placeholder="e.g. GB Processed"
                  onChange={(e) => setFormData({...formData, unitLabel: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {showFixed && (
                <>
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-[9px] font-black text-slate-500 uppercase">Old Fixed Rate ($/hr)</label>
                    <input type="number" step="0.0001" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-blue-500" 
                      placeholder="0.0450" onChange={(e) => setFormData({...formData, oldFixedRate: Number(e.target.value)})}/>
                  </div>
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-[9px] font-black text-slate-500 uppercase">New Fixed Rate ($/hr)</label>
                    <input type="number" step="0.0001" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-blue-500" 
                      placeholder="0.0110" onChange={(e) => setFormData({...formData, newFixedRate: Number(e.target.value)})}/>
                  </div>
                </>
              )}
              {showVariable && (
                <>
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-[9px] font-black text-slate-500 uppercase">Old Var Rate ($/unit)</label>
                    <input type="number" step="0.0001" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-blue-500" 
                      placeholder="0.0450" onChange={(e) => setFormData({...formData, oldVarRate: Number(e.target.value)})}/>
                  </div>
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-[9px] font-black text-slate-500 uppercase">New Var Rate ($/unit)</label>
                    <input type="number" step="0.0001" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-blue-500" 
                      placeholder="0.0000" onChange={(e) => setFormData({...formData, newVarRate: Number(e.target.value)})}/>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Optimization Logic</label>
            <textarea 
              required 
              rows={3} 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 mt-1 text-white text-sm leading-relaxed outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1. Reason... 2. Strategy... 3. Expected Outcome..."
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/30 active:scale-95">
            <CheckCircle size={20} /> Deploy Optimization Pattern
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTipModal;
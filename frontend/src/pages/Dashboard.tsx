import React, { useEffect, useState } from 'react';
import API from '../api';
import { 
  Cloud, 
  Zap, 
  DollarSign, 
  LogOut, 
  Plus, 
  LayoutDashboard,
  Trash2,
  AlertCircle,
  Maximize2,
  Filter
} from 'lucide-react';
import AddTipModal from '../components/AddTipModal';
import SavingsCalculator from '../components/SavingsCalculator';
import ViewTipModal from '../components/ViewTipModal';

interface Tip {
  _id: string;
  title: string;
  serviceName: string;
  category: string;
  description: string;
  calculationType: 'TIME' | 'VOLUME' | 'HYBRID';
  unitLabel: string;
  oldFixedRate: number;
  newFixedRate: number;
  oldVarRate: number;
  newVarRate: number;
}

const Dashboard = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);
  const [viewingTip, setViewingTip] = useState<Tip | null>(null);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Compute', 'Storage', 'Networking', 'Database'];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTips = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/tips');
      setTips(data);
    } catch (err) {
      console.error("Fetch error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTips(); }, []);

  const deleteTip = async (id: string) => {
    if (window.confirm("Delete this optimization pattern?")) {
      try {
        await API.delete(`/tips/${id}`);
        if (selectedTip?._id === id) setSelectedTip(null);
        fetchTips();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const filteredTips = tips.filter(tip => {
    const matchesCategory = activeCategory === 'All' || tip.category === activeCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tip.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10 selection:bg-blue-500/30">

      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-900/40">
            <Cloud className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Cloud Cost Wise</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAddModalOpen(true)} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} /> New Pattern
          </button>
          <button 
            onClick={() => {localStorage.clear(); window.location.href='/login'}} 
            className="p-2.5 bg-slate-800 text-slate-400 hover:text-red-400 rounded-xl border border-slate-700 transition-all hover:bg-slate-700"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="bg-slate-800/40 border border-slate-700/50 px-4 py-3 rounded-2xl flex items-center gap-3">
          <div className="bg-blue-400/10 p-2 rounded-lg text-blue-400">
            <Zap size={18} fill="currentColor" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase leading-none mb-1">Architecture Library</p>
            <p className="text-sm font-bold text-white">{tips.length} Active Patterns</p>
          </div>
        </div>
      </div>

      <SavingsCalculator activeTip={selectedTip} />

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-b border-slate-800 pb-8">
        <div className="space-y-4 flex-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-blue-500" size={20} />
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Optimization Library</h2>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
              <Filter size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search by pattern name or service (e.g. S3, EC2)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-3 pl-11 pr-4 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 self-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40'
                  : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
           <p className="text-xs font-medium">Syncing Infrastructure Data...</p>
        </div>
      ) : filteredTips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {filteredTips.map((tip) => {
            const oldTotal = (720 * tip.oldFixedRate) + (100 * tip.oldVarRate);
            const newTotal = (720 * tip.newFixedRate) + (100 * tip.newVarRate);
            const savingsPercent = oldTotal > 0 ? (((oldTotal - newTotal) / oldTotal) * 100).toFixed(0) : 0;

            return (
              <div 
                key={tip._id} 
                onClick={() => { setViewingTip(tip); setIsViewModalOpen(true); }}
                className={`group cursor-pointer bg-slate-800 border-2 p-6 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                  selectedTip?._id === tip._id ? 'border-blue-500 shadow-xl bg-slate-800/80' : 'border-slate-700 hover:border-blue-500/40 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="bg-blue-600/10 text-blue-400 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider w-fit">
                      {tip.category}
                    </span>
                    <span className="bg-green-500/10 text-green-500 text-[9px] font-bold px-2 py-0.5 rounded border border-green-500/20 w-fit">
                      {savingsPercent}% PROJECTED SAVE
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setSelectedTip(tip); 
                        window.scrollTo({top: 0, behavior: 'smooth'}); 
                      }}
                      className={`p-2 rounded-lg transition-all ${
                        selectedTip?._id === tip._id 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-slate-900 text-slate-500 hover:text-green-400'
                      }`}
                      title="Run Calculator"
                    >
                      <DollarSign size={16} />
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        deleteTip(tip._id); 
                      }}
                      className="p-2 bg-slate-900 text-slate-500 hover:text-red-500 rounded-lg transition-colors"
                      title="Delete Pattern"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-1 text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                  {tip.title}
                </h3>
                
                <p className="text-blue-500/80 text-[10px] font-black uppercase tracking-widest mb-4">
                  Target: {tip.serviceName}
                </p>

                <p className="text-slate-400 text-xs mb-6 line-clamp-2 leading-relaxed h-8">
                  {tip.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
                  <span className="text-[10px] text-slate-500 font-bold uppercase flex items-center gap-1">
                    <Maximize2 size={10}/> Click to expand
                  </span>
                  <span className="text-green-400/50 font-black text-[10px] uppercase">
                    {tip.calculationType} MODEL
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-slate-800">
          <AlertCircle className="mx-auto text-slate-700 mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-300">
            {searchQuery ? `No results for "${searchQuery}"` : 'Library Empty'}
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Try adjusting your search or category filter.
          </p>
        </div>
      )}

      <AddTipModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={fetchTips} 
      />

      <ViewTipModal 
        tip={viewingTip} 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
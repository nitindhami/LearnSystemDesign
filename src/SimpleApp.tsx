import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Search, BookOpen, Trophy, ArrowRight, 
  CheckCircle, Layers, Layout, Shield, Database, 
  Cpu, Globe, Zap, ChevronRight, Info, Menu, X,
  Clock, Tag, Star
} from 'lucide-react';
import { topics, glossary, checklist } from '../js/data';
import { Topic, UserProgress } from './types';
import TopicModal from './components/TopicModal';

// --- Simple Static App for GitHub Pages ---

const INITIAL_PROGRESS: UserProgress = {
  uid: 'static-user',
  completedTopics: [],
  favoriteTopics: [],
  totalXp: 0,
  streak: 1,
  lastUpdated: new Date().toISOString()
};

const SimpleApp = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('sd_progress_simple');
    return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
  });

  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sd_progress_simple', JSON.stringify(progress));
  }, [progress]);

  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProgress(prev => {
      const isCompleted = prev.completedTopics.includes(id);
      const newCompleted = isCompleted 
        ? prev.completedTopics.filter(t => t !== id)
        : [...prev.completedTopics, id];
      
      return {
        ...prev,
        completedTopics: newCompleted,
        totalXp: !isCompleted ? prev.totalXp + 1000 : prev.totalXp,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProgress(prev => ({
      ...prev,
      favoriteTopics: prev.favoriteTopics.includes(id)
        ? prev.favoriteTopics.filter(t => t !== id)
        : [...prev.favoriteTopics, id],
      lastUpdated: new Date().toISOString()
    }));
  };

  const selectedTopic = topics.find(t => t.id === selectedTopicId);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-blue-500 selection:text-white">
        {/* Simple Nav */}
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Layers className="w-6 h-6 text-white dark:text-black" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">SD Masterclass</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Dashboard</Link>
              <Link to="/glossary" className="text-sm font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Glossary</Link>
              <Link to="/checklist" className="text-sm font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Checklist</Link>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase text-slate-400">Level {Math.floor(progress.totalXp / 5000) + 1}</span>
                  <span className="text-sm font-black">{progress.totalXp.toLocaleString()} XP</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white dark:bg-black pt-24 px-6 md:hidden">
            <div className="flex flex-col gap-8 text-2xl font-black uppercase tracking-tighter">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <Link to="/glossary" onClick={() => setIsMenuOpen(false)}>Glossary</Link>
              <Link to="/checklist" onClick={() => setIsMenuOpen(false)}>Checklist</Link>
            </div>
          </div>
        )}

        <main className="pb-20">
          <Routes>
            <Route path="/" element={
              <div className="max-w-7xl mx-auto px-4 py-12">
                <header className="mb-16">
                  <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
                    System <br /> <span className="text-blue-600">Design</span>
                  </h1>
                  <p className="text-xl max-w-2xl font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                    A simplified, high-performance guide to mastering large-scale architecture. 
                    No fluff, just pure technical depth.
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {topics.map((topic, idx) => (
                    <div 
                      key={topic.id}
                      onClick={() => setSelectedTopicId(topic.id)}
                      className="group relative bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 hover:border-black dark:hover:border-white transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">0{idx + 1}</span>
                        <button 
                          onClick={(e) => toggleFavorite(topic.id, e)}
                          className={`p-2 rounded-full transition-colors ${progress.favoriteTopics.includes(topic.id) ? 'text-yellow-500' : 'text-slate-300 hover:text-slate-500'}`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                      
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-8 line-clamp-2 font-medium">
                        {topic.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {topic.time}</span>
                          <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {topic.difficulty}</span>
                        </div>
                        {progress.completedTopics.includes(topic.id) ? (
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:border-black dark:group-hover:border-white transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            } />

            <Route path="/glossary" element={
              <div className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-5xl font-black uppercase tracking-tighter mb-12">Glossary</h2>
                <div className="space-y-12">
                  {glossary.map((item) => (
                    <div key={item.term} className="border-b border-slate-200 dark:border-slate-800 pb-8">
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-blue-600">{item.term}</h3>
                      <p className="text-xl font-medium leading-relaxed">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            } />

            <Route path="/checklist" element={
              <div className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-5xl font-black uppercase tracking-tighter mb-12">Interview Checklist</h2>
                <div className="space-y-6">
                  {checklist.map((item, idx) => (
                    <div key={idx} className="flex gap-6 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-slate-100 dark:border-slate-800">
                      <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-xl font-bold leading-tight">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            } />
          </Routes>
        </main>

        {selectedTopic && (
          <TopicModal 
            topic={selectedTopic}
            isOpen={!!selectedTopicId}
            onClose={() => setSelectedTopicId(null)}
            isCompleted={progress.completedTopics.includes(selectedTopic.id)}
            isFavorited={progress.favoriteTopics.includes(selectedTopic.id)}
            onToggleComplete={toggleComplete}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </div>
    </Router>
  );
};

export default SimpleApp;

import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { 
  Search, Filter, BookOpen, Star, Trophy, ArrowRight, 
  CheckCircle, Heart, Layers, Layout, Shield, Database, 
  Cpu, Globe, Zap, MessageSquare, ChevronRight, Info
} from 'lucide-react';
import { auth, db, handleFirestoreError } from './firebase';
import { Topic, UserProgress } from './types';
import { topics, learningPaths, glossary, checklist } from '../js/data';
import Navbar from './components/Navbar';
import TopicCard from './components/TopicCard';
import TopicModal from './components/TopicModal';

// --- Components ---

const Dashboard = ({ 
  user, 
  progress, 
  onToggleComplete, 
  onToggleFavorite, 
  onOpenTopic 
}: { 
  user: User | null, 
  progress: UserProgress | null, 
  onToggleComplete: (id: string, e: React.MouseEvent) => void,
  onToggleFavorite: (id: string, e: React.MouseEvent) => void,
  onOpenTopic: (id: string) => void
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePath, setActivePath] = useState('All');

  const categories = ['All', ...new Set(topics.map(t => t.category))];
  const paths = ['All', ...learningPaths.map(p => p.name)];

  const filteredTopics = useMemo(() => {
    return topics.filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            topic.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || topic.category === activeCategory;
      const matchesPath = activePath === 'All' || learningPaths.find(p => p.name === activePath)?.topics.includes(topic.id);
      return matchesSearch && matchesCategory && matchesPath;
    });
  }, [searchQuery, activeCategory, activePath]);

  const stats = {
    completed: progress?.completedTopics.length || 0,
    total: topics.length,
    favorites: progress?.favoriteTopics.length || 0,
    percentage: Math.round(((progress?.completedTopics.length || 0) / topics.length) * 100)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="mb-16 relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-16 text-white shadow-2xl shadow-blue-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-2xl"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold mb-6 animate-fade-in">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Interview Ready 2026</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              Master <span className="text-blue-200">System Design</span> Like a Pro.
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-lg leading-relaxed">
              The ultimate guide for high-scale architecture. From beginner fundamentals to FAANG-level interview mastery.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-blue-900/20">
                Start Learning <ArrowRight className="w-5 h-5" />
              </button>
              <Link to="/roadmap" className="bg-blue-500/30 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-500/40 transition-all">
                View Roadmap
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Trophy className="text-yellow-300 w-7 h-7" />
              Your Progress
            </h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span>Course Completion</span>
                  <span>{stats.percentage}%</span>
                </div>
                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all duration-1000" style={{ width: `${stats.percentage}%` }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                  <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Completed</p>
                  <p className="text-3xl font-black">{stats.completed}/{stats.total}</p>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                  <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Total XP</p>
                  <p className="text-3xl font-black">{progress?.totalXp || 0}</p>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                  <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Streak</p>
                  <p className="text-3xl font-black flex items-center gap-2">
                    {progress?.streak || 1}
                    <Zap className="w-6 h-6 text-yellow-300 fill-current" />
                  </p>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                  <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Favorites</p>
                  <p className="text-3xl font-black">{stats.favorites}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="mb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="relative w-full lg:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search topics, concepts, architectures..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTopics.map(topic => (
            <TopicCard 
              key={topic.id}
              topic={topic}
              isCompleted={progress?.completedTopics.includes(topic.id) || false}
              isFavorited={progress?.favoriteTopics.includes(topic.id) || false}
              onToggleComplete={onToggleComplete}
              onToggleFavorite={onToggleFavorite}
              onClick={onOpenTopic}
            />
          ))}
        </div>
        {filteredTopics.length === 0 && (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
            <div className="bg-slate-200 dark:bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No topics found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </section>
    </div>
  );
};

const Roadmap = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4">Learning <span className="text-blue-600">Roadmap</span></h1>
        <p className="text-slate-500 text-lg">The proven path from beginner to architecture expert.</p>
      </div>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 rounded-full opacity-20"></div>
        <div className="space-y-12">
          {topics.map((topic, index) => (
            <div key={topic.id} className="relative pl-20 group">
              <div className="absolute left-[26px] top-6 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 group-hover:scale-150 transition-transform z-10"></div>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Step {index + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-500">{topic.category}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-black dark:text-white !opacity-100">{topic.title}</h3>
                <p className="text-black dark:text-white leading-relaxed !opacity-100">{topic.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Glossary = () => {
  const [search, setSearch] = useState('');
  const filteredGlossary = glossary.filter(item => 
    item.term.toLowerCase().includes(search.toLowerCase()) || 
    item.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div>
          <h1 className="text-5xl font-black mb-2 text-black dark:text-white">The <span className="text-blue-600">Glossary</span></h1>
          <p className="text-slate-900 dark:text-slate-100 font-medium">Every term you need to know, explained simply.</p>
        </div>
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search terms..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGlossary.map((item, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-black mb-3 text-blue-700 dark:text-blue-400">{item.term}</h3>
            <p className="text-black dark:text-white leading-relaxed font-medium">{item.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Checklist = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4 text-black dark:text-white">Interview <span className="text-blue-600">Checklist</span></h1>
        <p className="text-slate-900 dark:text-slate-100 font-medium text-lg">Don't walk into the interview without checking these off.</p>
      </div>
      <div className="space-y-12">
        {checklist.map((cat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 border-b dark:border-slate-700">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <CheckCircle className="text-blue-600 w-7 h-7" />
                {cat.category}
              </h3>
            </div>
            <div className="p-8 space-y-4">
              {cat.items.map((item, j) => (
                <label key={j} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group">
                  <input type="checkbox" className="w-6 h-6 rounded-lg border-2 border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                  <span className="text-lg font-bold text-black dark:text-white group-hover:text-blue-600 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InterviewGuide = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4 text-black dark:text-white">The <span className="text-blue-600">Interview Guide</span></h1>
        <p className="text-slate-900 dark:text-slate-100 font-medium text-lg">A structured framework to crack any system design interview.</p>
      </div>
      <div className="space-y-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
            <Info className="w-10 h-10 mb-6 opacity-50" />
            <h3 className="text-2xl font-bold mb-4">Why a Framework?</h3>
            <p className="text-blue-100 leading-relaxed">System design interviews are open-ended. Without a framework, you'll get lost in details and fail to cover critical components.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-2xl font-bold mb-4">The 4-Step Process</h3>
            <ul className="space-y-4">
              {['Clarify Requirements', 'High-Level Design', 'Deep Dive', 'Wrap Up'].map((step, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-100 flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <span className="font-bold">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <h2>Step 1: Clarify Requirements (5-10 mins)</h2>
          <p>Never start designing immediately. Ask clarifying questions to understand the scope.</p>
          <ul>
            <li><strong>Functional:</strong> What are the core features? (e.g., Post a tweet, follow users)</li>
            <li><strong>Non-Functional:</strong> Scalability, Availability, Latency, Consistency.</li>
            <li><strong>Scale:</strong> DAU, QPS, Storage requirements.</li>
          </ul>

          <h2>Step 2: High-Level Design (10-15 mins)</h2>
          <p>Draw the big picture. Focus on the main components and how they interact.</p>
          <ul>
            <li>Load Balancers</li>
            <li>API Gateway</li>
            <li>Microservices</li>
            <li>Databases (SQL vs NoSQL)</li>
            <li>Cache layers</li>
          </ul>

          <h2>Step 3: Deep Dive (15-20 mins)</h2>
          <p>This is where you show your expertise. Pick 1-2 critical components and go deep.</p>
          <ul>
            <li>Database Sharding strategies</li>
            <li>Message Queues for async processing</li>
            <li>Consistency models (Eventual vs Strong)</li>
            <li>Security & Rate Limiting</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Theme logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark', newTheme === 'dark');
  };

  // Auth logic
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        syncProgress(currentUser.uid);
      } else {
        setProgress(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Progress logic
  const syncProgress = (uid: string) => {
    const docRef = doc(db, 'userProgress', uid);
    return onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setProgress(snapshot.data() as UserProgress);
      } else {
        const initialProgress: UserProgress = {
          uid,
          completedTopics: [],
          favoriteTopics: [],
          totalXp: 0,
          streak: 1,
          lastUpdated: new Date().toISOString()
        };
        setDoc(docRef, initialProgress);
        setProgress(initialProgress);
      }
    }, (error) => handleFirestoreError(error, 'get' as any, `userProgress/${uid}`));
  };

  const toggleComplete = async (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || !progress) return;
    
    const isNowCompleted = !progress.completedTopics.includes(topicId);
    const newCompleted = isNowCompleted
      ? [...progress.completedTopics, topicId]
      : progress.completedTopics.filter(id => id !== topicId);
    
    // Award 1000 XP for each new completion
    const xpGain = isNowCompleted ? 1000 : -1000;
    const newXp = Math.max(0, (progress.totalXp || 0) + xpGain);
    
    const newProgress: UserProgress = { 
      ...progress, 
      completedTopics: newCompleted, 
      totalXp: newXp,
      lastUpdated: new Date().toISOString() 
    };
    
    try {
      await setDoc(doc(db, 'userProgress', user.uid), newProgress);
    } catch (error) {
      handleFirestoreError(error, 'update' as any, `userProgress/${user.uid}`);
    }
  };

  const toggleFavorite = async (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || !progress) return;
    
    const newFavorites = progress.favoriteTopics.includes(topicId)
      ? progress.favoriteTopics.filter(id => id !== topicId)
      : [...progress.favoriteTopics, topicId];
    
    const newProgress = { ...progress, favoriteTopics: newFavorites, lastUpdated: new Date().toISOString() };
    try {
      await setDoc(doc(db, 'userProgress', user.uid), newProgress);
    } catch (error) {
      handleFirestoreError(error, 'update' as any, `userProgress/${user.uid}`);
    }
  };

  const openTopic = (id: string) => {
    const topic = topics.find(t => t.id === id);
    if (topic) {
      setSelectedTopic(topic);
      setIsModalOpen(true);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar 
          user={user} 
          userProgress={progress}
          theme={theme} 
          toggleTheme={toggleTheme} 
          onLogin={handleLogin} 
          onLogout={handleLogout} 
        />
        
        <main className="pb-20">
          <Routes>
            <Route path="/" element={
              <Dashboard 
                user={user} 
                progress={progress} 
                onToggleComplete={toggleComplete} 
                onToggleFavorite={toggleFavorite} 
                onOpenTopic={openTopic} 
              />
            } />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/interview-guide" element={<InterviewGuide />} />
          </Routes>
        </main>

        <TopicModal 
          topic={selectedTopic}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isCompleted={progress?.completedTopics.includes(selectedTopic?.id || '') || false}
          isFavorited={progress?.favoriteTopics.includes(selectedTopic?.id || '') || false}
          onToggleComplete={toggleComplete}
          onToggleFavorite={toggleFavorite}
        />

        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Layers className="text-blue-600 w-6 h-6" />
              <span className="text-xl font-black tracking-tight">SysDesignMaster</span>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">
              The most comprehensive resource for mastering high-scale system architecture and cracking technical interviews.
            </p>
            <div className="flex justify-center gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Link to="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
              <Link to="/roadmap" className="hover:text-blue-600 transition-colors">Roadmap</Link>
              <Link to="/glossary" className="hover:text-blue-600 transition-colors">Glossary</Link>
              <Link to="/checklist" className="hover:text-blue-600 transition-colors">Checklist</Link>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] uppercase tracking-[0.2em]">
              &copy; 2026 System Design Masterclass. All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;

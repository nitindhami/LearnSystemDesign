import React, { useState, useEffect, useRef } from 'react';
import { X, Clock, CheckCircle, Heart, ChevronRight, MessageCircle, Lightbulb, Trophy, Star, Zap } from 'lucide-react';
import { Topic } from '../types';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

interface TopicModalProps {
  topic: Topic | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  isFavorited: boolean;
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

const TopicModal: React.FC<TopicModalProps> = ({ topic, isOpen, onClose, isCompleted, isFavorited, onToggleComplete, onToggleFavorite }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState<number[]>([]);
  const [xp, setXp] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setScrollProgress(0);
      setRevealedAnswers([]);
      setXp(0);
      setShowLevelUp(false);
    }
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
    
    // Gamification: Increase XP based on scroll
    const newXp = Math.floor(progress * 10);
    if (newXp > xp) {
      setXp(newXp);
    }
  };

  const handleDoneReading = (e: React.MouseEvent) => {
    if (scrollProgress > 95) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#10b981', '#f59e0b']
      });
      setShowLevelUp(true);
      setTimeout(() => {
        onToggleComplete(topic!.id, e);
        onClose();
      }, 2000);
    } else {
      onClose();
    }
  };

  const toggleAnswer = (index: number) => {
    const isRevealing = !revealedAnswers.includes(index);
    setRevealedAnswers(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
    
    if (isRevealing) {
      // Bonus XP for checking answers
      setXp(prev => prev + 50);
      // Small confetti for curiosity
      confetti({
        particleCount: 20,
        spread: 30,
        origin: { y: 0.8 },
        colors: ['#2563eb', '#10b981']
      });
    }
  };

  if (!isOpen || !topic) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={onClose}></div>
      
      <AnimatePresence>
        {showLevelUp && (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white dark:bg-slate-800 p-12 rounded-[3rem] shadow-2xl border-4 border-emerald-500 text-center">
              <Trophy className="w-24 h-24 text-emerald-500 mx-auto mb-6 animate-bounce" />
              <h2 className="text-5xl font-black mb-2 text-slate-900 dark:text-white">TOPIC MASTERED!</h2>
              <p className="text-2xl font-bold text-emerald-600">+1,000 XP EARNED</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative bg-white dark:bg-slate-950 w-full max-w-6xl max-h-[92vh] rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
        
        {/* Progress Bar & XP */}
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100 dark:bg-slate-800 z-[110]">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500"
            animate={{ width: `${scrollProgress}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </div>

        {/* Header */}
        <div className="p-6 sm:p-10 border-b dark:border-slate-800 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-[105]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                {topic.category}
              </span>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-black tracking-widest">
                <Zap className="w-3.5 h-3.5 fill-current" />
                {xp} XP
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mr-4">
              <Clock className="w-4 h-4" />
              {topic.time}
            </div>
            <button 
              onClick={(e) => onToggleFavorite(topic.id, e)} 
              className={`p-3 rounded-2xl transition-all ${isFavorited ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500 shadow-inner' : 'text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20'}`}
            >
              <Heart className={`w-7 h-7 ${isFavorited ? 'fill-rose-500' : ''}`} />
            </button>
            <button onClick={onClose} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors group">
              <X className="w-8 h-8 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div 
          ref={scrollRef}
          className="p-8 sm:p-16 lg:p-20 overflow-y-auto flex-grow custom-scrollbar bg-white dark:bg-slate-950" 
          onScroll={handleScroll}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl sm:text-7xl font-black mb-12 leading-[1.1] tracking-tight text-slate-900 dark:text-white"
            >
              {topic.title}
            </motion.h2>
            
            <div 
              className="prose prose-xl dark:prose-invert max-w-none mb-20 
                !text-black dark:!text-white !opacity-100
                prose-headings:!text-black dark:prose-headings:!text-white prose-headings:!opacity-100
                prose-p:!text-black dark:prose-p:!text-white prose-p:!opacity-100
                prose-p:leading-relaxed prose-p:text-xl sm:prose-p:text-2xl
                prose-strong:!text-blue-800 dark:prose-strong:!text-blue-300 prose-strong:!opacity-100
                prose-li:!text-black dark:prose-li:!text-white prose-li:!opacity-100
                prose-li:text-lg sm:prose-li:text-xl
                prose-code:!text-indigo-800 dark:prose-code:!text-indigo-300 prose-code:!opacity-100" 
              dangerouslySetInnerHTML={{ __html: topic.content }}
            ></div>

            {/* Takeaways Section */}
            <motion.div 
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-10 rounded-[3rem] mb-16 border-2 border-amber-100 dark:border-amber-900/30 shadow-xl shadow-amber-500/5"
            >
              <h4 className="text-2xl font-black mb-6 flex items-center gap-4 text-amber-900 dark:text-amber-100">
                <div className="p-3 bg-amber-200 dark:bg-amber-800 rounded-2xl shadow-lg">
                  <Lightbulb className="w-8 h-8" />
                </div>
                Key Takeaways
              </h4>
              <ul className="space-y-4 text-amber-900/80 dark:text-amber-100/80 text-lg font-medium">
                <li className="flex gap-4 items-start">
                  <Star className="w-6 h-6 text-amber-500 shrink-0 mt-1 fill-amber-500" />
                  Master the core principles of {topic.title} for high-level design.
                </li>
                <li className="flex gap-4 items-start">
                  <Star className="w-6 h-6 text-amber-500 shrink-0 mt-1 fill-amber-500" />
                  Understand the trade-offs between different architectural choices.
                </li>
                <li className="flex gap-4 items-start">
                  <Star className="w-6 h-6 text-amber-500 shrink-0 mt-1 fill-amber-500" />
                  Be ready to explain how this scales in a distributed environment.
                </li>
              </ul>
            </motion.div>

            {/* Interview Questions */}
            {topic.interviewQuestions && topic.interviewQuestions.length > 0 && (
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-10 rounded-[3rem] mb-16 border-2 border-indigo-100 dark:border-indigo-900/30 shadow-xl shadow-indigo-500/5">
                <h4 className="text-2xl font-black mb-8 flex items-center gap-4 text-indigo-900 dark:text-indigo-100">
                  <div className="p-3 bg-indigo-200 dark:bg-indigo-800 rounded-2xl shadow-lg">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  Real Interview Questions
                </h4>
                <div className="space-y-6">
                  {topic.interviewQuestions.map((q, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-sm font-black text-white shrink-0 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <p className="text-indigo-900 dark:text-indigo-100 text-xl font-bold leading-relaxed italic">"{q}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Section */}
            {topic.quiz && topic.quiz.length > 0 && (
              <div className="bg-slate-100 dark:bg-slate-900 p-10 rounded-[3rem] mt-16 border-2 border-slate-200 dark:border-slate-800 shadow-2xl">
                <h4 className="text-3xl font-black mb-10 flex items-center gap-4">
                  <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  Knowledge Check
                </h4>
                <div className="space-y-8">
                  {topic.quiz.map((q, i) => (
                    <div key={i} className="group bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                      <p className="font-black text-2xl mb-6 flex gap-4 text-slate-900 dark:text-white">
                        <span className="text-blue-600">Q{i + 1}.</span>
                        {q.q}
                      </p>
                      <button 
                        onClick={() => toggleAnswer(i)}
                        className="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all"
                      >
                        <ChevronRight className={`w-4 h-4 transition-transform ${revealedAnswers.includes(i) ? 'rotate-90' : ''}`} />
                        {revealedAnswers.includes(i) ? 'Hide Answer' : 'Reveal Answer'}
                      </button>
                      <AnimatePresence>
                        {revealedAnswers.includes(i) && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-6 p-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border-2 border-emerald-100 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-100 text-lg font-bold leading-relaxed">
                              {q.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 sm:p-10 border-t dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 z-[105]">
          <div className="flex flex-col">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Current Progress</p>
            <div className="flex items-center gap-3">
              <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: `${scrollProgress}%` }}></div>
              </div>
              <span className="text-sm font-black text-slate-900 dark:text-white">{Math.round(scrollProgress)}%</span>
            </div>
          </div>
          <button 
            onClick={handleDoneReading} 
            className={`px-12 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl ${scrollProgress > 95 ? 'bg-emerald-600 text-white shadow-emerald-500/30' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-slate-500/30'}`}
          >
            {scrollProgress > 95 ? 'Mastered!' : 'Done Reading'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicModal;

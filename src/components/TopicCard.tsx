import React from 'react';
import { Clock, CheckCircle, Heart, ChevronRight } from 'lucide-react';
import { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  isCompleted: boolean;
  isFavorited: boolean;
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onClick: (id: string) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, isCompleted, isFavorited, onToggleComplete, onToggleFavorite, onClick }) => {
  const getDifficultyClass = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'Intermediate': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
      case 'Advanced': return 'text-rose-500 bg-rose-50 dark:bg-rose-900/20';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20';
    }
  };

  return (
    <div 
      onClick={() => onClick(topic.id)}
      className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 flex flex-col h-full transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${getDifficultyClass(topic.difficulty)}`}>
          {topic.difficulty}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={(e) => onToggleFavorite(topic.id, e)} 
            className={`p-2 rounded-xl transition-all ${isFavorited ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500' : 'text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20'}`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
          </button>
          <button 
            onClick={(e) => onToggleComplete(topic.id, e)} 
            className={`p-2 rounded-xl transition-all ${isCompleted ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500' : 'text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}`}
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-grow">
        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1 block">{topic.category}</span>
        <h3 className="text-xl font-extrabold mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-white">{topic.title}</h3>
        <p className="text-slate-900 dark:text-slate-100 text-sm mb-6 line-clamp-3 leading-relaxed font-medium">{topic.description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100 dark:border-slate-700 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{topic.time}</span>
          </div>
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Read More <ChevronRight className="w-3 h-3" />
          </span>
        </div>
        <div className="flex -space-x-2">
          {topic.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[9px] font-bold text-slate-900 dark:text-slate-100 border border-white dark:border-slate-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicCard;

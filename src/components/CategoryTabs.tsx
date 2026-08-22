import React from 'react';
import {
  Sparkles,
  BookOpen,
  Scroll,
  HeartHandshake,
  CheckSquare,
  Flame,
  Home,
  ListTodo
} from 'lucide-react';
import { ItemCategory } from '../types';

interface CategoryTabsProps {
  selectedCategory: ItemCategory;
  onSelectCategory: (category: ItemCategory) => void;
  categoryCounts: Record<ItemCategory, { total: number; completed: number }>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  const tabs: { id: ItemCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'semua', label: 'Semua Checklist', icon: Sparkles },
    { id: 'ibadah_wajib', label: 'Sholat & Ibadah', icon: Flame },
    { id: 'tugas_rumah', label: 'Pekerjaan Rumah (10)', icon: Home },
    { id: 'surat', label: 'Surat Juz 30', icon: BookOpen },
    { id: 'hadits', label: '36 Hadits Siswa Hebat', icon: Scroll },
    { id: 'doa_harian', label: "36 Do'a Harian", icon: HeartHandshake },
    { id: 'doa_sholat', label: "Do'a Sholat (14)", icon: CheckSquare },
    { id: 'tugas_kustom', label: 'Tugas Kustom', icon: ListTodo }
  ];

  return (
    <div className="overflow-x-auto scrollbar-none py-1 -mx-2 px-2">
      <div className="flex items-center gap-2 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = selectedCategory === tab.id;
          const stats = categoryCounts[tab.id] || { total: 0, completed: 0 };
          const isDone = stats.total > 0 && stats.completed === stats.total;

          return (
            <button
              key={tab.id}
              id={`tab-category-${tab.id}`}
              onClick={() => onSelectCategory(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-600/30'
                  : 'bg-white text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/70 border border-slate-200/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  isSelected
                    ? isDone
                      ? 'bg-amber-300 text-amber-950'
                      : 'bg-white/20 text-white'
                    : isDone
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {stats.completed}/{stats.total}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

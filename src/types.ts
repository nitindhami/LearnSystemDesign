export interface Topic {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  tags: string[];
  description: string;
  content: string;
  quiz?: { q: string; a: string }[];
  interviewQuestions?: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  topics: string[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface ChecklistCategory {
  category: string;
  items: string[];
}

export interface UserProgress {
  uid: string;
  completedTopics: string[];
  favoriteTopics: string[];
  totalXp: number;
  streak: number;
  lastUpdated: string; // ISO string
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: any; // Firestore Timestamp
  lastLogin: any; // Firestore Timestamp
}

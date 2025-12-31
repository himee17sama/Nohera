// src/types.ts
export type BookStatus = 'reading' | 'completed' | 'abandoned';

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  format: "papier" | "ebook" | "audio";
  rating: number;
  comment: string;
  readingTime: number;
  dateStarted: string; // Date de début de lecture
  status: BookStatus; // Statut de lecture
  imageUrl?: string;
  // Pour compatibilité avec les anciens livres
  date?: string;
};

// Fonction utilitaire pour calculer la date de fin de lecture
export function calculateEndDate(dateStarted: string, readingTime: number): string {
  if (!dateStarted || readingTime <= 0) return '';
  const startDate = new Date(dateStarted);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + readingTime);
  return endDate.toISOString();
}

export const CATEGORIES = [
  'Fiction',
  'Non-fiction',
  'Science-fiction',
  'Fantasy',
  'Romantasy',
  'Mystère',
  'Romance',
  'New-Romance',
  'Thriller',
  'Biographie',
  'Histoire',
  'Philosophie',
  'Développement personnel',
  'Jeunesse',
  'Bande dessinée',
  'Poésie',
  'Religion',
  'Théâtre',
  'Autre'
] as const;

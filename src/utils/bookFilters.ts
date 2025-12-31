// src/utils/bookFilters.ts
import type { Book } from '../types';
import { calculateEndDate } from '../types';

// Obtenir les livres en cours de lecture
export function getCurrentReadings(books: Book[]): Book[] {
  return books.filter(book => {
    const status = book.status || (book.readingTime > 0 ? 'completed' : 'reading');
    return status === 'reading';
  });
}

// Obtenir les livres abandonnés
export function getAbandonedBooks(books: Book[]): Book[] {
  return books.filter(book => book.status === 'abandoned');
}

// Obtenir les livres terminés
export function getCompletedBooks(books: Book[]): Book[] {
  return books.filter(book => {
    const status = book.status || (book.readingTime > 0 ? 'completed' : 'reading');
    return status === 'completed';
  });
}

// Obtenir les livres du mois dernier
export function getLastMonthReadings(books: Book[]): Book[] {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
  
  return books.filter(book => {
    const startDate = new Date(book.dateStarted || book.date || '');
    const status = book.status || (book.readingTime > 0 ? 'completed' : 'reading');
    
    // Pour les livres terminés, vérifier la date de fin
    if (status === 'completed' && book.readingTime > 0) {
      const endDate = new Date(calculateEndDate(book.dateStarted || book.date || '', book.readingTime));
      return (startDate >= lastMonth && startDate <= lastMonthEnd) ||
             (endDate >= lastMonth && endDate <= lastMonthEnd);
    }
    
    // Pour les autres, vérifier la date de début
    return startDate >= lastMonth && startDate <= lastMonthEnd;
  });
}

// Obtenir les livres du mois actuel
export function getThisMonthReadings(books: Book[]): Book[] {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  
  return books.filter(book => {
    const startDate = new Date(book.dateStarted || book.date || '');
    const status = book.status || (book.readingTime > 0 ? 'completed' : 'reading');
    
    // Pour les livres terminés, vérifier la date de fin
    if (status === 'completed' && book.readingTime > 0) {
      const endDate = new Date(calculateEndDate(book.dateStarted || book.date || '', book.readingTime));
      return (startDate >= thisMonth && startDate <= thisMonthEnd) ||
             (endDate >= thisMonth && endDate <= thisMonthEnd);
    }
    
    // Pour les autres, vérifier la date de début
    return startDate >= thisMonth && startDate <= thisMonthEnd;
  });
}

// Obtenir les livres d'un mois spécifique
export function getBooksByMonth(books: Book[], year: number, month: number): Book[] {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0, 23, 59, 59);
  
  return books.filter(book => {
    const startDate = new Date(book.dateStarted || book.date || '');
    const status = book.status || (book.readingTime > 0 ? 'completed' : 'reading');
    
    // Pour les livres terminés, vérifier la date de fin
    if (status === 'completed' && book.readingTime > 0) {
      const endDate = new Date(calculateEndDate(book.dateStarted || book.date || '', book.readingTime));
      return (startDate >= monthStart && startDate <= monthEnd) ||
             (endDate >= monthStart && endDate <= monthEnd);
    }
    
    // Pour les autres, vérifier la date de début
    return startDate >= monthStart && startDate <= monthEnd;
  });
}

// Obtenir les livres d'une année spécifique
export function getBooksByYear(books: Book[], year: number): Book[] {
  const yearStart = new Date(year, 0, 1);
  const yearEnd = new Date(year, 11, 31, 23, 59, 59);
  
  return books.filter(book => {
    const startDate = new Date(book.dateStarted || book.date || '');
    const status = book.status || (book.readingTime > 0 ? 'completed' : 'reading');
    
    // Pour les livres terminés, vérifier la date de fin
    if (status === 'completed' && book.readingTime > 0) {
      const endDate = new Date(calculateEndDate(book.dateStarted || book.date || '', book.readingTime));
      return (startDate >= yearStart && startDate <= yearEnd) ||
             (endDate >= yearStart && endDate <= yearEnd);
    }
    
    // Pour les autres, vérifier la date de début
    return startDate >= yearStart && startDate <= yearEnd;
  });
}

// Calculer la vitesse de lecture moyenne (livres terminés par mois)
export function calculateReadingSpeed(books: Book[]): number {
  const completedBooks = getCompletedBooks(books);
  if (completedBooks.length === 0) return 0;
  
  const now = new Date();
  const booksWithDates = completedBooks.filter(book => book.dateStarted || book.date);
  if (booksWithDates.length === 0) return 0;
  
  const oldestBook = booksWithDates.reduce((oldest, book) => {
    const bookDate = new Date(book.dateStarted || book.date || '');
    return bookDate < oldest ? bookDate : oldest;
  }, new Date(booksWithDates[0].dateStarted || booksWithDates[0].date || ''));
  
  const monthsDiff = (now.getTime() - oldestBook.getTime()) / (1000 * 60 * 60 * 24 * 30);
  return monthsDiff > 0 ? booksWithDates.length / monthsDiff : booksWithDates.length;
}


// src/utils/generateTestData.ts
import type { Book } from '../types';

export function generateTestBooks(): Book[] {
  const now = new Date();
  const books: Book[] = [];

  // Livres terminés cette année (variés)
  const completedBooks = [
    { title: 'Le Seigneur des Anneaux', author: 'J.R.R. Tolkien', category: 'Fantasy', rating: 5, readingTime: 45 },
    { title: 'Dune', author: 'Frank Herbert', category: 'Science-fiction', rating: 5, readingTime: 30 },
    { title: '1984', author: 'George Orwell', category: 'Fiction', rating: 5, readingTime: 15 },
    { title: 'L\'Étranger', author: 'Albert Camus', category: 'Fiction', rating: 4, readingTime: 8 },
    { title: 'Harry Potter à l\'école des sorciers', author: 'J.K. Rowling', category: 'Fantasy', rating: 5, readingTime: 12 },
    { title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', category: 'Jeunesse', rating: 5, readingTime: 3 },
    { title: 'Sapiens', author: 'Yuval Noah Harari', category: 'Histoire', rating: 4, readingTime: 20 },
    { title: 'L\'Art de la guerre', author: 'Sun Tzu', category: 'Philosophie', rating: 4, readingTime: 5 },
    { title: 'Le Comte de Monte-Cristo', author: 'Alexandre Dumas', category: 'Fiction', rating: 5, readingTime: 60 },
    { title: 'Fondation', author: 'Isaac Asimov', category: 'Science-fiction', rating: 5, readingTime: 25 },
  ];

  // Générer des livres terminés sur les 12 derniers mois
  completedBooks.forEach((book, index) => {
    const monthsAgo = 11 - (index % 12);
    const startDate = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1 + (index % 28));
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + book.readingTime);
    
    books.push({
      id: `test-completed-${index}`,
      title: book.title,
      author: book.author,
      category: book.category,
      format: index % 3 === 0 ? 'papier' : index % 3 === 1 ? 'ebook' : 'audio',
      rating: book.rating,
      comment: index % 2 === 0 ? 'Excellent livre !' : '',
      readingTime: book.readingTime,
      dateStarted: startDate.toISOString().split('T')[0],
      status: 'completed',
      imageUrl: undefined
    });
  });

  // Livres en cours de lecture
  const currentReadings = [
    { title: 'Les Misérables', author: 'Victor Hugo', category: 'Fiction', rating: 0 },
    { title: 'Le Nom du vent', author: 'Patrick Rothfuss', category: 'Fantasy', rating: 0 },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Développement personnel', rating: 0 },
  ];

  currentReadings.forEach((book, index) => {
    const daysAgo = 10 + (index * 5);
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - daysAgo);
    
    books.push({
      id: `test-reading-${index}`,
      title: book.title,
      author: book.author,
      category: book.category,
      format: 'ebook',
      rating: book.rating,
      comment: '',
      readingTime: 0,
      dateStarted: startDate.toISOString().split('T')[0],
      status: 'reading',
      imageUrl: undefined
    });
  });

  // Livres abandonnés
  const abandonedBooks = [
    { title: 'Ulysse', author: 'James Joyce', category: 'Fiction', rating: 2 },
    { title: 'La Recherche du temps perdu', author: 'Marcel Proust', category: 'Fiction', rating: 3 },
  ];

  abandonedBooks.forEach((book, index) => {
    const monthsAgo = 3 + index;
    const startDate = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 15);
    
    books.push({
      id: `test-abandoned-${index}`,
      title: book.title,
      author: book.author,
      category: book.category,
      format: 'papier',
      rating: book.rating,
      comment: 'Trop difficile à suivre',
      readingTime: 5,
      dateStarted: startDate.toISOString().split('T')[0],
      status: 'abandoned',
      imageUrl: undefined
    });
  });

  // Livres terminés l'année dernière
  const lastYearBooks = [
    { title: 'Le Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy', rating: 5, readingTime: 10 },
    { title: 'Orgueil et Préjugés', author: 'Jane Austen', category: 'Romance', rating: 4, readingTime: 18 },
    { title: 'Le Meilleur des mondes', author: 'Aldous Huxley', category: 'Science-fiction', rating: 4, readingTime: 14 },
  ];

  lastYearBooks.forEach((book, index) => {
    const lastYear = now.getFullYear() - 1;
    const month = 6 + index; // Juillet, Août, Septembre
    const startDate = new Date(lastYear, month, 10);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + book.readingTime);
    
    books.push({
      id: `test-lastyear-${index}`,
      title: book.title,
      author: book.author,
      category: book.category,
      format: 'ebook',
      rating: book.rating,
      comment: '',
      readingTime: book.readingTime,
      dateStarted: startDate.toISOString().split('T')[0],
      status: 'completed',
      imageUrl: undefined
    });
  });

  return books;
}


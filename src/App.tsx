import { useEffect, useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import type { Book } from './types';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      try {
        const parsedBooks: Book[] = JSON.parse(storedBooks);
        // Migration : convertir les anciens livres
        const migratedBooks = parsedBooks.map(book => {
          let updatedBook = { ...book };
          
          // Migration date -> dateStarted
          if (!updatedBook.dateStarted && updatedBook.date) {
            updatedBook.dateStarted = updatedBook.date;
          }
          
          // Migration statut : si pas de statut, le déterminer selon readingTime
          if (!updatedBook.status) {
            updatedBook.status = updatedBook.readingTime > 0 ? 'completed' : 'reading';
          }
          
          return updatedBook;
        });
        setBooks(migratedBooks);
      } catch (error) {
        console.error('Erreur lors du chargement des livres:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, [books, isLoaded]);

  return (
    <div>
      <Header />
      <Dashboard totalBooks={books.length} />
      <Library books={books} setBooks={setBooks} />
    </div>
  );
}

export default App;


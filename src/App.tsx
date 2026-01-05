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
    } else {
      // Si aucun livre n'existe, charger les données de test
      const testDataLoaded = localStorage.getItem('testDataLoaded');
      if (!testDataLoaded) {
        import('./utils/generateTestData').then(module => {
          const testBooks = module.generateTestBooks();
          setBooks(testBooks);
          localStorage.setItem('testDataLoaded', 'true');
        });
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, [books, isLoaded]);

  const handleAddTestData = (testBooks: Book[]) => {
    setBooks(prevBooks => [...prevBooks, ...testBooks]);
  };

  return (
    <div>
      <Header />
      <Dashboard totalBooks={books.length} onAddTestData={handleAddTestData} />
      <Library books={books} setBooks={setBooks} />
    </div>
  );
}

export default App;


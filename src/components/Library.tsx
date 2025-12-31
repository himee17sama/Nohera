// src/components/Library.tsx
import { useState } from 'react';
import BookCard from './BookCard';
import BookForm from './BookForm';
import Tabs from './Tabs';
import ReadingStats from './ReadingStats';
import type { Book } from '../types';
import { getCurrentReadings, getLastMonthReadings, getThisMonthReadings } from '../utils/bookFilters';

type LibraryProps = {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
};

const Library = ({ books, setBooks }: LibraryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleAddBook = (book: Book) => {
    setBooks(prevBooks => [...prevBooks, book]);
  };

  const handleDeleteBook = (id: string) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  const handleEditBook = (updatedBook: Book) => {
    setBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
  };

  // Filtrer les livres selon l'onglet actif
  const getBooksForTab = () => {
    switch (activeTab) {
      case 'all':
        return books;
      case 'current':
        return getCurrentReadings(books);
      case 'thisMonth':
        return getThisMonthReadings(books);
      case 'lastMonth':
        return getLastMonthReadings(books);
      default:
        return books;
    }
  };

  const tabBooks = getBooksForTab();

  const filteredBooks = tabBooks.filter(book => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query)
    );
  });

  const renderBookList = () => (
    <>
      <BookForm onAddBook={handleAddBook} />
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="🔍 Rechercher un livre (titre, auteur, catégorie)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '2px solid #CDB4DB',
            fontSize: '1rem',
            fontFamily: 'Arial, sans-serif'
          }}
        />
      </div>
      {filteredBooks.length === 0 && searchQuery ? (
        <p style={{ color: '#4B0082', fontFamily: 'Arial, sans-serif' }}>
          Aucun livre trouvé pour "{searchQuery}"
        </p>
      ) : filteredBooks.length === 0 ? (
        <p style={{ color: '#4B0082', fontFamily: 'Arial, sans-serif' }}>
          Aucun livre dans cette catégorie
        </p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start'
        }}>
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              {...book}
              onDelete={handleDeleteBook}
              onEdit={handleEditBook}
            />
          ))}
        </div>
      )}
    </>
  );

  const tabs = [
    {
      id: 'all',
      label: 'Toutes mes lectures',
      content: renderBookList()
    },
    {
      id: 'current',
      label: 'Lecture actuelle',
      content: renderBookList()
    },
    {
      id: 'thisMonth',
      label: 'Ce mois',
      content: renderBookList()
    },
    {
      id: 'lastMonth',
      label: 'Mois dernier',
      content: renderBookList()
    },
    {
      id: 'stats',
      label: 'Statistiques',
      content: <ReadingStats books={books} />
    }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Library;

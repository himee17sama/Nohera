// src/components/ReadingStats.tsx
import type { Book } from '../types';
import { getBooksByMonth, getBooksByYear, calculateReadingSpeed, getCurrentReadings, getCompletedBooks, getAbandonedBooks } from '../utils/bookFilters';

type ReadingStatsProps = {
  books: Book[];
};

export default function ReadingStats({ books }: ReadingStatsProps) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  // Calculer les statistiques
  const totalBooks = books.length;
  const completedBooks = getCompletedBooks(books).length;
  const currentReadings = getCurrentReadings(books).length;
  const abandonedBooks = getAbandonedBooks(books).length;
  const booksThisMonth = getBooksByMonth(books, currentYear, currentMonth).length;
  const booksThisYear = getBooksByYear(books, currentYear).length;
  const readingSpeed = calculateReadingSpeed(books);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#4B0082', fontFamily: 'Arial, sans-serif', marginBottom: '1.5rem' }}>
        Statistiques de lecture
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: '#FFF5F5',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4B0082', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
            Total de livres
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#CDB4DB', margin: '0' }}>
            {totalBooks}
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#FFF5F5',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4B0082', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
            Terminés
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B0082', margin: '0' }}>
            {completedBooks}
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#FFF5F5',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4B0082', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
            En cours
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#CDB4DB', margin: '0' }}>
            {currentReadings}
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#FFF5F5',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4B0082', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
            Abandonnés
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9d174d', margin: '0' }}>
            {abandonedBooks}
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#FFF5F5',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4B0082', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
            Livres ce mois
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#CDB4DB', margin: '0' }}>
            {booksThisMonth}
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#FFF5F5',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4B0082', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
            Livres cette année
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#CDB4DB', margin: '0' }}>
            {booksThisYear}
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#FFF5F5',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4B0082', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
            Vitesse moyenne
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#CDB4DB', margin: '0' }}>
            {readingSpeed.toFixed(1)}/mois
          </p>
        </div>
      </div>

      <div style={{
        backgroundColor: '#FFF5F5',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        color: '#666'
      }}>
        <p style={{ margin: '0', fontStyle: 'italic' }}>
          Les graphiques seront disponibles prochainement
        </p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
          Graphiques prévus : Vitesse de lecture, Livres par mois, Livres par année
        </p>
      </div>
    </div>
  );
}


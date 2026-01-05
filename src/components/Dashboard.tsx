import { useState } from 'react';
import { generateTestBooks } from '../utils/generateTestData';
import type { Book } from '../types';

interface DashboardProps {
  totalBooks: number;
  onAddTestData?: (books: Book[]) => void;
}

const Dashboard = ({ totalBooks, onAddTestData }: DashboardProps) => {
  const [testDataAdded, setTestDataAdded] = useState(false);

  const handleAddTestData = () => {
    const testBooks = generateTestBooks();
    if (onAddTestData) {
      onAddTestData(testBooks);
      setTestDataAdded(true);
      setTimeout(() => setTestDataAdded(false), 3000);
    }
  };

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f5e7f0', // couleur nude/rose pâle
      borderRadius: '10px',
      margin: '1rem 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <div>
        <h2 style={{ color: '#7d5ba6', margin: '0 0 0.5rem 0' }}>Dashboard</h2>
        <p style={{ margin: 0 }}>Total de livres : {totalBooks}</p>
      </div>
      {onAddTestData && (
        <button
          onClick={handleAddTestData}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#CDB4DB',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#F7C8D1')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#CDB4DB')}
        >
          {testDataAdded ? '✅ Données ajoutées !' : '📚 Ajouter des données de test'}
        </button>
      )}
    </div>
  );
};

export default Dashboard;

// src/components/BookForm.tsx
import { useState } from 'react';
import type { Book } from '../types';
import { CATEGORIES } from '../types';

type BookFormProps = {
  onAddBook: (book: Book) => void;
};

export default function BookForm({ onAddBook }: BookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Fiction');
  const [rating, setRating] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [dateStarted, setDateStarted] = useState(new Date().toISOString().split('T')[0]);
  const [readingTime, setReadingTime] = useState(0);
  const [isInProgress, setIsInProgress] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;
    
    const newBook: Book = {
        id: Date.now().toString(),
        title,
        author,
        category,
        format: 'papier',
        rating,
        comment: '',
        readingTime: isInProgress ? 0 : readingTime,
        dateStarted: dateStarted || new Date().toISOString().split('T')[0],
        status: isInProgress ? 'reading' : 'completed',
        imageUrl: imageUrl || undefined
      };
      
    onAddBook(newBook);

    setTitle('');
    setAuthor('');
    setCategory('Fiction');
    setRating(1);
    setImageUrl('');
    setDateStarted(new Date().toISOString().split('T')[0]);
    setReadingTime(0);
    setIsInProgress(true);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '500px' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Titre du livre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: '1', minWidth: '200px', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Auteur"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ flex: '1', minWidth: '200px', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ flex: '1', minWidth: '150px', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{ minWidth: '100px', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} ★</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="date"
          value={dateStarted}
          onChange={(e) => setDateStarted(e.target.value)}
          style={{ flex: '1', minWidth: '150px', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        {!isInProgress && (
          <input
            type="number"
            placeholder="Durée (jours)"
            value={readingTime}
            onChange={(e) => setReadingTime(Number(e.target.value) || 0)}
            min="0"
            style={{ minWidth: '120px', padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        )}
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={isInProgress}
          onChange={(e) => setIsInProgress(e.target.checked)}
          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
        />
        <span style={{ fontSize: '0.9rem', color: '#4B0082' }}>En cours de lecture</span>
      </label>
      <input
        type="url"
        placeholder="URL de l'image (optionnel)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <button 
        type="submit" 
        style={{ 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#CDB4DB', 
          color: '#333', 
          borderRadius: '8px', 
          border: 'none', 
          cursor: 'pointer',
          alignSelf: 'flex-start',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = '#F7C8D1')}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = '#CDB4DB')}
      >
        Ajouter le livre
      </button>
    </form>
  );
}

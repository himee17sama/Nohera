// src/components/BookCard.tsx
import { useState } from 'react';
import type { Book, BookStatus } from '../types';
import { CATEGORIES, calculateEndDate } from '../types';

type BookCardProps = Book & {
  onDelete: (id: string) => void;
  onEdit: (updatedBook: Book) => void;
};

export default function BookCard({ id, title, author, category, format, rating, comment, readingTime, dateStarted, date, status, imageUrl, onDelete, onEdit }: BookCardProps) {
  // Gestion de la compatibilité avec les anciens livres
  const startDate = dateStarted || date || new Date().toISOString();
  const bookStatus: BookStatus = status || (readingTime > 0 ? 'completed' : 'reading');
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({ 
    title, 
    author, 
    category, 
    format, 
    rating, 
    comment, 
    readingTime, 
    dateStarted: startDate.split('T')[0],
    status: bookStatus,
    imageUrl: imageUrl || '' 
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditedBook(prev => ({ ...prev, [name]: checked }));
    } else {
      setEditedBook(prev => ({ ...prev, [name]: name === 'rating' || name === 'readingTime' ? Number(value) : value }));
    }
  };

  const handleSave = () => {
    const updatedBook: Book = {
      id,
      ...editedBook,
      dateStarted: editedBook.dateStarted,
      status: editedBook.status,
      imageUrl: editedBook.imageUrl || undefined
    };
    onEdit(updatedBook);
    setIsEditing(false);
  };

  // Calculer la date de fin pour l'affichage
  const endDate = calculateEndDate(startDate, readingTime);

  const renderStars = (num: number) => '★'.repeat(num) + '☆'.repeat(5 - num);

  return (
    <div style={{
      backgroundColor: '#FFF5F5',
      borderRadius: '12px',
      padding: '1rem',
      margin: '0.5rem',
      width: '220px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      fontFamily: 'Arial, sans-serif',
      color: '#4B0082'
    }}>
      {isEditing ? (
        <>
          <input name="title" value={editedBook.title} onChange={handleChange} placeholder="Titre" style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="author" value={editedBook.author} onChange={handleChange} placeholder="Auteur" style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <select name="category" value={editedBook.category} onChange={handleChange} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select name="format" value={editedBook.format} onChange={handleChange} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}>
            <option value="papier">papier</option>
            <option value="ebook">ebook</option>
            <option value="audio">audio</option>
          </select>
          <select name="rating" value={editedBook.rating} onChange={handleChange} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} ★</option>
            ))}
          </select>
          <textarea name="comment" value={editedBook.comment} onChange={handleChange} placeholder="Commentaire" style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input type="date" name="dateStarted" value={editedBook.dateStarted} onChange={handleChange} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <select name="status" value={editedBook.status} onChange={handleChange} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }}>
            <option value="reading">En cours</option>
            <option value="completed">Terminé</option>
            <option value="abandoned">Abandonné</option>
          </select>
          {editedBook.status === 'completed' && (
            <input type="number" name="readingTime" value={editedBook.readingTime} onChange={handleChange} placeholder="Durée de lecture (jours)" min="0" style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          )}
          {editedBook.readingTime > 0 && editedBook.dateStarted && editedBook.status === 'completed' && (
            <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
              Date de fin calculée: {new Date(calculateEndDate(editedBook.dateStarted, editedBook.readingTime)).toLocaleDateString()}
            </p>
          )}
          <input type="url" name="imageUrl" value={editedBook.imageUrl} onChange={handleChange} placeholder="URL de l'image" style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <button onClick={handleSave} style={{ backgroundColor: '#CDB4DB', color: '#333', borderRadius: '8px', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#F7C8D1')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '#CDB4DB')}>Sauvegarder</button>
        </>
      ) : (
        <>
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={title}
              style={{
                width: '100%',
                maxHeight: '150px',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '0.5rem'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <h3 style={{ margin: '0', fontSize: '1.1rem', lineHeight: '1.3', flex: '1' }}>{title}</h3>
            {bookStatus === 'reading' && (
              <span style={{ 
                backgroundColor: '#CDB4DB', 
                color: '#4B0082', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px', 
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                En cours
              </span>
            )}
            {bookStatus === 'abandoned' && (
              <span style={{ 
                backgroundColor: '#F7C8D1', 
                color: '#9d174d', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px', 
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                Abandonné
              </span>
            )}
          </div>
          <p style={{ margin: '0', fontSize: '0.9rem' }}>Auteur: {author}</p>
          <p style={{ margin: '0', fontSize: '0.85rem' }}>Catégorie: {category}</p>
          <p style={{ margin: '0', fontSize: '0.85rem' }}>Format: {format}</p>
          <p style={{ margin: '0', fontSize: '0.9rem' }}>Note: {renderStars(rating)}</p>
          {comment && <p style={{ margin: '0', fontSize: '0.85rem', fontStyle: 'italic' }}>Commentaire: {comment}</p>}
          {bookStatus === 'completed' && readingTime > 0 && <p style={{ margin: '0', fontSize: '0.85rem' }}>Durée: {readingTime} jour{readingTime > 1 ? 's' : ''}</p>}
          <p style={{ margin: '0', fontSize: '0.85rem' }}>Début: {new Date(startDate).toLocaleDateString()}</p>
          {endDate && readingTime > 0 && bookStatus === 'completed' && (
            <p style={{ margin: '0', fontSize: '0.85rem' }}>Fin: {new Date(endDate).toLocaleDateString()}</p>
          )}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#CDB4DB', color: '#333', borderRadius: '8px', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#F7C8D1')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '#CDB4DB')}>Modifier</button>
            <button onClick={() => onDelete(id)} style={{ backgroundColor: '#F7C8D1', color: '#9d174d', borderRadius: '8px', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#CDB4DB')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '#F7C8D1')}>Supprimer</button>
          </div>
        </>
      )}
    </div>
  );
}

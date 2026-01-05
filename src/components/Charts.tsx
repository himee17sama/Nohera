// src/components/Charts.tsx
import type { Book } from '../types';
import { getBooksByMonth, getBooksByYear, getCompletedBooks } from '../utils/bookFilters';
import { calculateEndDate } from '../types';

type ChartsProps = {
  books: Book[];
};

// Graphique en barres pour les livres par mois (12 derniers mois)
export function BooksPerMonthChart({ books }: ChartsProps) {
  const now = new Date();
  const months: { label: string; count: number }[] = [];
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthBooks = getBooksByMonth(books, date.getFullYear(), date.getMonth());
    months.push({
      label: date.toLocaleDateString('fr-FR', { month: 'short' }),
      count: monthBooks.length
    });
  }
  
  const maxCount = Math.max(...months.map(m => m.count), 1);
  const chartHeight = 200;
  const barWidth = 30;
  const spacing = 10;
  const totalWidth = months.length * (barWidth + spacing);
  
  return (
    <div style={{
      backgroundColor: '#FFF5F5',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ color: '#4B0082', margin: '0 0 1rem 0', fontSize: '1.2rem' }}>
        Livres par mois (12 derniers mois)
      </h3>
      <svg width="100%" height={chartHeight + 40} viewBox={`0 0 ${totalWidth} ${chartHeight + 40}`} style={{ overflow: 'visible' }}>
        {months.map((month, index) => {
          const x = index * (barWidth + spacing);
          const barHeight = (month.count / maxCount) * chartHeight;
          const y = chartHeight - barHeight;
          
          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#CDB4DB"
                rx="4"
              />
              <text
                x={x + barWidth / 2}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#4B0082"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                {month.label}
              </text>
              {month.count > 0 && (
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#4B0082"
                  fontWeight="bold"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {month.count}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Graphique en barres pour les livres par année (5 dernières années)
export function BooksPerYearChart({ books }: ChartsProps) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const years: { label: string; count: number }[] = [];
  
  for (let i = 4; i >= 0; i--) {
    const year = currentYear - i;
    const yearBooks = getBooksByYear(books, year);
    years.push({
      label: year.toString(),
      count: yearBooks.length
    });
  }
  
  const maxCount = Math.max(...years.map(y => y.count), 1);
  const chartHeight = 200;
  const barWidth = 60;
  const spacing = 20;
  const totalWidth = years.length * (barWidth + spacing);
  
  return (
    <div style={{
      backgroundColor: '#FFF5F5',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ color: '#4B0082', margin: '0 0 1rem 0', fontSize: '1.2rem' }}>
        Livres par année (5 dernières années)
      </h3>
      <svg width="100%" height={chartHeight + 40} viewBox={`0 0 ${totalWidth} ${chartHeight + 40}`} style={{ overflow: 'visible' }}>
        {years.map((year, index) => {
          const x = index * (barWidth + spacing);
          const barHeight = (year.count / maxCount) * chartHeight;
          const y = chartHeight - barHeight;
          
          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#4B0082"
                rx="4"
              />
              <text
                x={x + barWidth / 2}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#4B0082"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                {year.label}
              </text>
              {year.count > 0 && (
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#4B0082"
                  fontWeight="bold"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {year.count}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Graphique de vitesse de lecture (livres terminés par mois)
export function ReadingSpeedChart({ books }: ChartsProps) {
  const now = new Date();
  const completedBooks = getCompletedBooks(books);
  const months: { label: string; count: number }[] = [];
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthCompleted = completedBooks.filter(book => {
      if (book.readingTime <= 0) return false;
      const endDate = new Date(calculateEndDate(book.dateStarted || book.date || '', book.readingTime));
      return endDate.getFullYear() === date.getFullYear() && endDate.getMonth() === date.getMonth();
    });
    months.push({
      label: date.toLocaleDateString('fr-FR', { month: 'short' }),
      count: monthCompleted.length
    });
  }
  
  const maxCount = Math.max(...months.map(m => m.count), 1);
  const chartHeight = 200;
  const chartWidth = Math.max(months.length * 40, 400);
  const points: string[] = [];
  
  months.forEach((month, index) => {
    const divisor = months.length > 1 ? (months.length - 1) : 1;
    const x = (index / divisor) * chartWidth;
    const y = chartHeight - (month.count / maxCount) * chartHeight;
    points.push(`${x},${y}`);
  });
  
  const pathData = months.length > 0 ? `M ${points.join(' L ')}` : '';
  
  return (
    <div style={{
      backgroundColor: '#FFF5F5',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ color: '#4B0082', margin: '0 0 1rem 0', fontSize: '1.2rem' }}>
        Vitesse de lecture (livres terminés par mois)
      </h3>
      <svg width="100%" height={chartHeight + 40} viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`} style={{ overflow: 'visible' }}>
        <path
          d={pathData}
          fill="none"
          stroke="#CDB4DB"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {months.map((month, index) => {
          const divisor = months.length > 1 ? (months.length - 1) : 1;
          const x = (index / divisor) * chartWidth;
          const y = chartHeight - (month.count / maxCount) * chartHeight;
          
          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="#4B0082"
              />
              <text
                x={x}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#4B0082"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                {month.label}
              </text>
              {month.count > 0 && (
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#4B0082"
                  fontWeight="bold"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {month.count}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}


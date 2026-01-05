// src/components/Tabs.tsx
import type { ReactNode } from 'react';

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        borderBottom: '2px solid #CDB4DB',
        marginBottom: '1.5rem',
        gap: '0.5rem'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: activeTab === tab.id ? '#CDB4DB' : 'transparent',
              color: activeTab === tab.id ? '#4B0082' : '#666',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid #4B0082' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              fontFamily: 'Arial, sans-serif',
              transition: 'all 0.2s ease',
              borderRadius: '8px 8px 0 0'
            }}
            onMouseOver={e => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = '#F7C8D1';
              }
            }}
            onMouseOut={e => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}


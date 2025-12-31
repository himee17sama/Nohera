

interface DashboardProps {
  totalBooks: number;
}

const Dashboard: React.FC<DashboardProps> = ({ totalBooks }) => {
  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f5e7f0', // couleur nude/rose pâle
      borderRadius: '10px',
      margin: '1rem 0'
    }}>
      <h2 style={{ color: '#7d5ba6' }}>Dashboard</h2>
      <p>Total de livres : {totalBooks}</p>
    </div>
  );
};

export default Dashboard;

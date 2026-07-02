import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

// ==========================================
// 1. Main Layout
// ==========================================
function MainLayout({ children }) {
  const location = useLocation();
  const menuStyle = (path) => ({
    color: location.pathname === path ? '#D4AF37' : '#ffffff',
    textDecoration: 'none',
    borderBottom: location.pathname === path ? '2px solid #D4AF37' : '2px solid transparent',
    paddingBottom: '3px',
    transition: 'all 0.3s',
    whiteSpace: 'nowrap'
  });

  return (
    <div style={{ fontFamily: '"Sarabun", "Kanit", sans-serif', backgroundColor: '#eef2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      <header style={{ backgroundColor: '#1a1a1a', padding: '15px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="logo" style={{ width: '40px' }} />
          <h1 style={{ color: '#fff', fontSize: '18px', margin: 0 }}>ตำรวจภูธรจังหวัดน่าน</h1>
        </div>
        <nav style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
          <Link to="/" style={menuStyle('/')}>หน้าแรก</Link>
          <Link to="/about" style={menuStyle('/about')}>เกี่ยวกับเรา</Link>
        </nav>
      </header>
      <main style={{ flex: 1, width: '100%' }}>{children}</main>
      <footer style={{ backgroundColor: '#1a1a1a', color: '#bbb', textAlign: 'center', padding: '20px' }}>
        ตำรวจภูธรจังหวัดน่าน © 2026
      </footer>
    </div>
  );
}

// ==========================================
// 2. Home Page (Responsive)
// ==========================================
function HomePage() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    axios.get('https://nanpolice-api.onrender.com/api/announcements')
      .then(res => setNewsList(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 10px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      
      {/* Sidebar - บนมือถือจะวางบน ขยายเต็มจอ */}
      <aside style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3>ผู้บังคับบัญชา</h3>
          <img src="/commander.png" style={{ width: '100%', borderRadius: '4px' }} alt="commander" />
        </div>
        
        {/* Facebook Plugin - Responsive */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
          <div style={{ backgroundColor: '#1C3D5A', color: '#fff', padding: '10px', textAlign: 'center' }}>Facebook ภ.จว.น่าน</div>
          <div style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}>
            <iframe 
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpolice5.nan&tabs=timeline&width=500&height=600&adapt_container_width=true" 
              style={{ border: 'none', width: '100%', height: '600px' }} 
              allow="encrypted-media"
            ></iframe>
          </div>
        </div>
      </aside>

      {/* Main News */}
      <main style={{ flex: '2 1 600px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h2>📢 ข่าวประกาศ</h2>
        {newsList.map(news => (
          <div key={news.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            {news.title}
          </div>
        ))}
      </main>
    </div>
  );
}

// ==========================================
// 3. Router
// ==========================================
function App() {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('token'));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        {/* หน้าอื่นๆ เพิ่มเติมที่นี่ */}
        <Route path="/admin" element={isAdmin ? <AdminDashboard setIsAdmin={setIsAdmin} /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
      </Routes>
    </Router>
  );
}

export default App;
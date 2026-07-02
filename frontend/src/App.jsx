import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

// ==========================================
// 1. ส่วน Layout หลัก
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

  const policeStations = [
    { name: "เมืองน่าน", url: "https://mueangnan.nan.police.go.th/" }, { name: "เวียงสา", url: "https://wiangsa.nan.police.go.th/p1-home/page1.htm" },
    { name: "ท่าวังผา", url: "https://thawangpha.nan.police.go.th/" }, { name: "ปัว", url: "https://pua.nan.police.go.th/" },
    { name: "เชียงกลาง", url: "https://chiangklang.nan.police.go.th/" }, { name: "ทุ่งช้าง", url: "https://thungchang.nan.police.go.th/" },
    { name: "เฉลิมพระเกียรติ", url: "https://chalermprakiat.nan.police.go.th/" }, { name: "บ่อเกลือ", url: "https://boklua.nan.police.go.th/" },
    { name: "สันติสุข", url: "https://santisuk.nan.police.go.th/" }, { name: "แม่จริม", url: "https://maecharim.nan.police.go.th/" },
    { name: "สองแคว", url: "https://songkhwae.nan.police.go.th/" }, { name: "บ้านหลวง", url: "https://banluang.nan.police.go.th/" },
    { name: "ภูเพียง", url: "" }, { name: "นาน้อย", url: "https://www.nanoi.nan.police.go.th/" },
    { name: "นาหมื่น", url: "https://namuen.nan.police.go.th/Home/home.html" }, { name: "เรือง", url: "#" },
    { name: "งอบ", url: "https://ngob.nan.police.go.th/" }, { name: "น้ำมวบ", url: "https://sites.google.com/view/nammuab-nan-police" },
    { name: "อวน", url: "https://ouan.nan.police.go.th/" }, { name: "ตาลชุม", url: "https://sites.google.com/view/tanchumnanpolice/home" }
  ];

  return (
    <div style={{ fontFamily: '"Sarabun", "Kanit", sans-serif', backgroundColor: '#eef2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .dropdown { position: relative; display: inline-block; white-space: nowrap; }
        .dropdown-content { display: none; position: absolute; background-color: #1a1a1a; min-width: 200px; max-height: 400px; overflow-y: auto; box-shadow: 0px 8px 16px rgba(0,0,0,0.5); z-index: 101; border-radius: 4px; top: 100%; left: 0; border: 1px solid #333; }
        .dropdown:hover .dropdown-content { display: block; }
        .dropdown-item { color: white; padding: 12px 20px; text-decoration: none; display: block; font-size: 15px; border-bottom: 1px solid #2a2a2a; }
        .dropdown-item:hover { background-color: #8B0000; color: #D4AF37; }
        .nav-link:hover { color: #D4AF37 !important; }
      `}</style>
      <div style={{ backgroundColor: '#1C3D5A', height: '6px', width: '100%' }}></div>
      <header style={{ backgroundColor: '#1a1a1a', padding: '12px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '3px solid #333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/logo.png" alt="โลโก้" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', color: '#ffffff' }}>ตำรวจภูธรจังหวัดน่าน</h1>
            <h3 style={{ margin: 0, fontSize: '11px', color: '#cccccc' }}>NAN PROVINCIAL POLICE</h3>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: '15px', fontSize: '15px' }}>
          <Link to="/" className="nav-link" style={menuStyle('/')}>หน้าแรก</Link>
          <Link to="/about" className="nav-link" style={menuStyle('/about')}>เกี่ยวกับเรา</Link>
          <Link to="/commander" className="nav-link" style={menuStyle('/commander')}>ผู้บังคับบัญชา</Link>
          <div className="dropdown" style={{ cursor: 'pointer', paddingBottom: '3px' }}>
            <span className="nav-link" style={{ color: '#ffffff' }}>สถานีตำรวจในสังกัด ▾</span>
            <div className="dropdown-content">
              {policeStations.map((s, i) => <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="dropdown-item">สภ.{s.name}</a>)}
            </div>
          </div>
          <Link to="/museum" className="nav-link" style={menuStyle('/museum')}>พิพิธภัณฑ์ตำรวจน่าน</Link>
          <Link to="/download" className="nav-link" style={menuStyle('/download')}>ดาวน์โหลด</Link>
          <Link to="/contact" className="nav-link" style={menuStyle('/contact')}>ติดต่อ-สอบถาม</Link>
        </nav>
      </header>
      <div style={{ flex: 1 }}>{children}</div>
      <footer style={{ backgroundColor: '#1a1a1a', color: '#bbb', textAlign: 'center', padding: '40px 20px', borderTop: '5px solid #8B0000', marginTop: 'auto' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#fff' }}>ตำรวจภูธรจังหวัดน่าน</p>
        <p style={{ margin: 0, fontSize: '14px' }}>52 ถนนสุริยพงษ์ ตำบลในเวียง อำเภอเมืองน่าน จังหวัดน่าน 55000</p>
      </footer>
    </div>
  );
}

// ==========================================
// 2. หน้าต่างๆ (Pages)
// ==========================================

function HomePage() {
  const [newsList, setNewsList] = useState([]);
  const bannerImages = ['/banner1.jpg', '/banner2.jpg']; 
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    axios.get('https://nanpolice-api.onrender.com/api/announcements').then(res => setNewsList(res.data)).catch(console.error);
  }, []);

  return (
    <>
      <div style={{ position: 'relative', width: '95%', maxWidth: '1200px', margin: '30px auto', backgroundColor: '#e0e0e0', borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
        {bannerImages.map((img, index) => <img key={index} src={img} style={{ width: '100%', height: 'auto', opacity: currentBanner === index ? 1 : 0, transition: 'opacity 0.8s' }} />)}
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto 50px auto', padding: '0 20px', display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        <aside style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
            <h3>ผู้บังคับบัญชา</h3>
            <img src="/commander.png" style={{ width: '150px', height: '200px', objectFit: 'cover' }} />
            <p style={{ fontWeight: 'bold' }}>พล.ต.ต.ดเรศ กัลยา</p>
          </div>
          {/* แก้ไข Facebook Plugin ตรงนี้ */}
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3 style={{ textAlign: 'center' }}>Facebook ภ.จว.น่าน</h3>
            <iframe 
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpolice5.nan&tabs=timeline&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true" 
              style={{ border: 'none', width: '100%', height: '600px' }} 
              allow="encrypted-media"
            ></iframe>
          </div>
        </aside>
        <main style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #ddd' }}>
          <h2>ข่าวประกวดราคา / ประกาศตำรวจ</h2>
          {newsList.map(news => (
            <div key={news.id} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
              <strong>{news.title}</strong>
              {news.document_url && <a href={`https://nanpolice-api.onrender.com/uploads/${news.document_url}`} target="_blank" style={{ display: 'block', color: 'red' }}>ดาวน์โหลด</a>}
            </div>
          ))}
        </main>
      </div>
    </>
  );
}

function AboutPage() { return <div style={{ padding: '40px' }}><h2>เกี่ยวกับเรา</h2></div>; }
function CommanderPage() { return <div style={{ padding: '40px' }}><img src="/structure.png" /></div>; }
function MuseumPage() { return <div style={{ padding: '40px' }}><h2>พิพิธภัณฑ์</h2></div>; }
function DownloadPage() { return <div style={{ padding: '40px' }}><h2>ดาวน์โหลด</h2></div>; }
function ContactPage() { return <div style={{ padding: '40px' }}><h2>ติดต่อเรา</h2></div>; }

function App() {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('token'));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/commander" element={<MainLayout><CommanderPage /></MainLayout>} />
        <Route path="/museum" element={<MainLayout><MuseumPage /></MainLayout>} />
        <Route path="/download" element={<MainLayout><DownloadPage /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard setIsAdmin={setIsAdmin} /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={isAdmin ? <Navigate to="/admin" /> : <AdminLogin setIsAdmin={setIsAdmin} />} />
      </Routes>
    </Router>
  );
}

export default App;
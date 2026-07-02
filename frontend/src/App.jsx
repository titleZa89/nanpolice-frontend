import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

// ==========================================
// 1. ส่วน Layout หลัก (Header & Footer ที่จะโชว์ทุกหน้า)
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

  // 🌟 รายชื่อสถานีตำรวจ และ ลิงก์เว็บของแต่ละสถานี
  const policeStations = [
    { name: "เมืองน่าน", url: "https://mueangnan.nan.police.go.th/" },
    { name: "เวียงสา", url: "https://wiangsa.nan.police.go.th/p1-home/page1.htm" },
    { name: "ท่าวังผา", url: "https://thawangpha.nan.police.go.th/" },
    { name: "ปัว", url: "https://pua.nan.police.go.th/" },
    { name: "เชียงกลาง", url: "https://chiangklang.nan.police.go.th/" },
    { name: "ทุ่งช้าง", url: "https://thungchang.nan.police.go.th/" },
    { name: "เฉลิมพระเกียรติ", url: "https://chalermprakiat.nan.police.go.th/" },
    { name: "บ่อเกลือ", url: "https://boklua.nan.police.go.th/" },
    { name: "สันติสุข", url: "https://santisuk.nan.police.go.th/" },
    { name: "แม่จริม", url: "https://maecharim.nan.police.go.th/" },
    { name: "สองแคว", url: "https://songkhwae.nan.police.go.th/" },
    { name: "บ้านหลวง", url: "https://banluang.nan.police.go.th/" },
    { name: "ภูเพียง", url: "" },
    { name: "นาน้อย", url: "https://www.nanoi.nan.police.go.th/" },
    { name: "นาหมื่น", url: "https://namuen.nan.police.go.th/Home/home.html" },
    { name: "เรือง", url: "#" },
    { name: "งอบ", url: "https://ngob.nan.police.go.th/" },
    { name: "น้ำมวบ", url: "https://sites.google.com/view/nammuab-nan-police" },
    { name: "อวน", url: "https://ouan.nan.police.go.th/" },
    { name: "ตาลชุม", url: "https://sites.google.com/view/tanchumnanpolice/home" }
  ];

  return (
    <div style={{ fontFamily: '"Sarabun", "Kanit", sans-serif', backgroundColor: '#eef2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <style>{`
        .dropdown { position: relative; display: inline-block; white-space: nowrap; }
        .dropdown-content { 
          display: none; 
          position: absolute; 
          background-color: #1a1a1a; 
          min-width: 200px; 
          max-height: 400px; 
          overflow-y: auto;  
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.5); 
          z-index: 101; 
          border-radius: 4px; 
          top: 100%; 
          left: 0; 
          border: 1px solid #333;
        }
        .dropdown-content::-webkit-scrollbar { width: 6px; }
        .dropdown-content::-webkit-scrollbar-track { background: #1a1a1a; }
        .dropdown-content::-webkit-scrollbar-thumb { background: #555; border-radius: 3px; }
        .dropdown-content::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
        
        .dropdown:hover .dropdown-content { display: block; }
        .dropdown-item { color: white; padding: 12px 20px; text-decoration: none; display: block; transition: background 0.3s; white-space: nowrap; font-size: 15px; border-bottom: 1px solid #2a2a2a; }
        .dropdown-item:last-child { border-bottom: none; }
        .dropdown-item:hover { background-color: #8B0000; color: #D4AF37; }
        .nav-link:hover { color: #D4AF37 !important; }
      `}</style>

      {/* Top Bar */}
      <div style={{ backgroundColor: '#1C3D5A', height: '6px', width: '100%' }}></div>

      {/* Header - เพิ่ม flexWrap ให้เมนูยืดหยุ่นในมือถือ */}
      <header style={{ backgroundColor: '#1a1a1a', padding: '12px 30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '3px solid #333', gap: '15px' }}>
        
        {/* โลโก้และชื่อ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexShrink: 0 }}>
          <img src="/logo.png" alt="โลโก้" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', letterSpacing: '0.5px', whiteSpace: 'nowrap', color: '#ffffff' }}>ตำรวจภูธรจังหวัดน่าน</h1>
            <h3 style={{ margin: 0, fontSize: '11px', fontWeight: '300', letterSpacing: '1px', color: '#cccccc', whiteSpace: 'nowrap' }}>NAN PROVINCIAL POLICE</h3>
          </div>
        </div>

        {/* แถบเมนู Navigation - เพิ่ม flexWrap */}
        <nav style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', fontSize: '15px', fontWeight: '400' }}>
          <Link to="/" className="nav-link" style={menuStyle('/')}>หน้าแรก</Link>
          <Link to="/about" className="nav-link" style={menuStyle('/about')}>เกี่ยวกับเรา</Link>
          <Link to="/commander" className="nav-link" style={menuStyle('/commander')}>ผู้บังคับบัญชา</Link>
          
          {/* Dropdown สถานีตำรวจ */}
          <div className="dropdown" style={{ cursor: 'pointer', paddingBottom: '3px' }}>
            <span className="nav-link" style={{ color: '#ffffff', transition: 'all 0.3s', whiteSpace: 'nowrap' }}>สถานีตำรวจในสังกัด ▾</span>
            <div className="dropdown-content">
              {policeStations.map((station, index) => (
                <a 
                  key={index} 
                  href={station.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="dropdown-item"
                >
                  สภ.{station.name}
                </a>
              ))}
            </div>
          </div>

          <Link to="/museum" className="nav-link" style={menuStyle('/museum')}>พิพิธภัณฑ์ตำรวจน่าน</Link>
          <Link to="/download" className="nav-link" style={menuStyle('/download')}>ดาวน์โหลด</Link>
          <Link to="/contact" className="nav-link" style={menuStyle('/contact')}>ติดต่อ-สอบถาม</Link>
        </nav>
      </header>

      {/* พื้นที่แสดงเนื้อหาของแต่ละหน้า */}
      <div style={{ flex: 1, width: '100%', overflowX: 'hidden' }}>
        {children}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a1a1a', color: '#bbb', textAlign: 'center', padding: '40px 20px', borderTop: '5px solid #8B0000', marginTop: 'auto' }}>
        <img src="/logo.png" alt="โลโก้" style={{ width: '50px', height: '50px', opacity: '0.5', marginBottom: '15px', filter: 'grayscale(100%)' }} />
        <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#fff' }}>ตำรวจภูธรจังหวัดน่าน</p>
        <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>52 ถนนสุริยพงษ์ ตำบลในเวียง อำเภอเมืองน่าน จังหวัดน่าน 55000</p>
        <p style={{ margin: 0, fontSize: '14px' }}>โทรศัพท์: 0-5477-1379</p>
      </footer>
    </div>
  );
}

// ==========================================
// 2. หน้าต่างๆ ของเว็บไซต์ (Pages)
// ==========================================

// --- หน้าแรก (Home) ---
function HomePage() {
  const [newsList, setNewsList] = useState([]);
  const bannerImages = ['/banner1.jpg', '/banner2.jpg']; 
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    fetchNews();
    const timer = setInterval(() => setCurrentBanner((prev) => (prev + 1) % bannerImages.length), 5000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://nanpolice-api.onrender.com/api/announcements');
      setNewsList(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
  const formatThaiDate = (dateString) => new Date(dateString).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <div style={{ position: 'relative', width: '95%', maxWidth: '1200px', margin: '30px auto', backgroundColor: '#e0e0e0', borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
        {bannerImages.length > 0 && <img src={bannerImages[0]} style={{ width: '100%', height: 'auto', visibility: 'hidden', display: 'block' }} />}
        {bannerImages.map((img, index) => (
          <img key={index} src={img} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: currentBanner === index ? 1 : 0, transition: 'opacity 0.8s' }} />
        ))}
        <button onClick={prevBanner} style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}>❮</button>
        <button onClick={nextBanner} style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}>❯</button>
      </div>

      {/* ✨ จุดสำคัญที่แก้: เพิ่ม flexWrap: 'wrap' เพื่อให้มือถือเรียงกล่องลงมาด้านล่างได้ ไม่เบียดกัน */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 50px auto', padding: '0 20px', display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* ✨ จุดสำคัญที่แก้: เปลี่ยน width ตายตัว เป็น flex-basis ให้ยืดหยุ่น */}
        <aside style={{ flex: '1 1 320px', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ backgroundColor: 'white', padding: '0 0 25px 0', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', textAlign: 'center', overflow: 'hidden', border: '1px solid #ddd' }}>
            <div style={{ backgroundColor: '#8B0000', color: 'white', padding: '15px 0', borderBottom: '3px solid #D4AF37' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>ผู้บังคับบัญชา</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ padding: '5px', border: '1px solid #D4AF37', borderRadius: '4px', display: 'inline-block' }}>
                <img src="/commander.png" style={{ width: '150px', height: '200px', objectFit: 'cover', display: 'block' }} />
              </div>
              <p style={{ fontWeight: 'bold', margin: '15px 0 5px 0', fontSize: '18px', color: '#1C3D5A' }}>พล.ต.ต.ดเรศ กัลยา</p>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>ผู้บังคับการตำรวจภูธรจังหวัดน่าน</p>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', overflow: 'hidden', border: '1px solid #ddd' }}>
            <div style={{ backgroundColor: '#1C3D5A', color: 'white', padding: '12px 0', borderBottom: '3px solid #1877F2', textAlign: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>Facebook ภ.จว.น่าน</h3>
            </div>
            
            <div style={{ 
  padding: '10px', 
  display: 'flex', 
  justifyContent: 'center', 
  width: '100%', 
  overflow: 'hidden' // ป้องกันไม่ให้ทะลุขอบ
}}>
  <div style={{ 
    width: '100%', 
    maxWidth: '500px', // ให้กว้างสุดแค่ 500px ในคอม
    position: 'relative'
  }}>
    <iframe 
      src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpolice5.nan&tabs=timeline&width=500&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
      style={{ 
        border: 'none', 
        overflow: 'hidden', 
        width: '100%', 
        height: '1500px',
        display: 'block'
      }} 
      allow="encrypted-media"
    ></iframe>
  </div>
</div>
          </div>
        </aside>

        {/* ✨ จุดสำคัญที่แก้: เพิ่ม minWidth ให้กล่องข่าว */}
        <main style={{ flex: '2 1 600px', minWidth: '300px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', overflow: 'hidden', border: '1px solid #ddd' }}>
          <div style={{ backgroundColor: '#1C3D5A', color: 'white', padding: '18px 25px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '3px solid #D4AF37' }}>
            <span style={{ fontSize: '22px' }}>📢</span>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '500' }}>ข่าวประกวดราคา / ประกาศตำรวจ</h2>
          </div>
          <div style={{ padding: '20px 25px' }}>
            {newsList.length > 0 ? (
              newsList.map((news) => (
                <div key={news.id} style={{ borderBottom: '1px solid #eee', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <strong style={{ fontSize: '18px', color: '#222', display: 'block', marginBottom: '8px' }}>{news.title}</strong>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#777' }}>
                      <span>📅 {formatThaiDate(news.created_at)}</span>
                      <span style={{ color: '#8B0000', backgroundColor: '#fdeaea', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>{news.category_name}</span>
                    </div>
                  </div>
                  {news.document_url && (
                    <a href={`https://nanpolice-api.onrender.com/uploads/${news.document_url}`} target="_blank" rel="noreferrer" style={{ backgroundColor: '#8B0000', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>📄 ดาวน์โหลด</a>
                  )}
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#999', padding: '30px' }}>ยังไม่มีประกาศในขณะนี้</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

// --- หน้าเกี่ยวกับองค์กร (About) ---
function AboutPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', minHeight: '60vh', fontFamily: '"Sarabun", "Kanit", sans-serif' }}>

      {/* ส่วนหัวของหน้า (จัดโลโก้และข้อความให้อยู่กึ่งกลาง) */}
      <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/logo.png" alt="ตราแผ่นดิน/โลโก้" style={{ width: '85px', marginBottom: '15px' }} />
        <h2 style={{ color: '#1C3D5A', fontSize: '28px', borderBottom: '3px solid #D4AF37', display: 'inline-block', paddingBottom: '10px', marginTop: 0 }}>
          เกี่ยวกับหน่วยงาน
        </h2>
        <h3 style={{ color: '#8B0000', fontSize: '20px', marginTop: '10px', fontWeight: '500' }}>
          ตำรวจภูธรจังหวัดน่าน (Nan Provincial Police)
        </h3>
      </div>

      {/* วิสัยทัศน์ & พันธกิจ & ค่านิยม - กรอบหลักทางการ */}
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px', borderTop: '5px solid #1C3D5A' }}>
        
        {/* วิสัยทัศน์ */}
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h3 style={{ color: '#D4AF37', margin: '0 0 10px 0', fontSize: '20px', backgroundColor: '#1C3D5A', display: 'inline-block', padding: '8px 30px', borderRadius: '25px' }}>
            วิสัยทัศน์ (Vision)
          </h3>
          <p style={{ color: '#1C3D5A', lineHeight: '1.6', fontSize: '20px', fontWeight: 'bold', marginTop: '20px' }}>
            "เป็นองค์กรบังคับใช้กฎหมายที่นำสมัย ในระดับมาตรฐานสากล<br/>เพื่อให้ประชาชนเชื่อมั่นศรัทธา"
          </p>
        </div>

        <hr style={{ border: '0', borderTop: '1px dashed #ccc', margin: '30px 0' }} />

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {/* พันธกิจ (นำไอคอนออก) */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3 style={{ color: '#8B0000', margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>
              พันธกิจ (Mission)
            </h3>
            <ol style={{ color: '#444', lineHeight: '1.8', fontSize: '16px', margin: '0', paddingLeft: '20px' }}>
              <li>ถวายความปลอดภัยแด่พระมหากษัตริย์และพระบรมวงศานุวงศ์</li>
              <li>บังคับใช้กฎหมายและอำนวยความยุติธรรมทางอาญา</li>
              <li>รักษาความสงบเรียบร้อยและความปลอดภัยของประชาชนในพื้นที่</li>
              <li>ให้บริการประชาชนด้วยความรวดเร็ว เป็นธรรม และเสมอภาค</li>
            </ol>
          </div>
          
          {/* ค่านิยมหลัก (นำไอคอนออก) */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3 style={{ color: '#1C3D5A', margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>
              ค่านิยมหลัก (Core Values)
            </h3>
            <ul style={{ color: '#444', lineHeight: '1.8', fontSize: '16px', margin: '0', paddingLeft: '20px', listStyleType: 'square' }}>
              <li><strong>S (Service Mind):</strong> มีจิตบริการ</li>
              <li><strong>M (Moral):</strong> มีคุณธรรม จริยธรรม</li>
              <li><strong>A (Accountability):</strong> มีความรับผิดชอบ</li>
              <li><strong>R (Rule of Law):</strong> ยึดหลักนิติธรรม</li>
              <li><strong>T (Teamwork):</strong> ทำงานเป็นทีม</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ประวัติความเป็นมา */}
      <div style={{ backgroundColor: '#fdfbf7', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px', border: '1px solid #e8e0c5' }}>
        <h3 style={{ color: '#8B0000', borderLeft: '5px solid #D4AF37', paddingLeft: '15px', marginTop: '0', fontSize: '20px' }}>ประวัติความเป็นมา</h3>
        <p style={{ color: '#444', lineHeight: '1.8', fontSize: '16px', textIndent: '40px', marginBottom: '15px', textAlign: 'justify' }}>
          ตำรวจภูธรจังหวัดน่าน เป็นหน่วยงานระดับกองบังคับการ รับผิดชอบการปฏิบัติงานของสถานีตำรวจในสังกัดจำนวน 20 แห่ง ครอบคลุมพื้นที่ 15 อำเภอ ของจังหวัดน่าน มีภารกิจหลักในการป้องกันปราบปรามอาชญากรรม การรักษาความสงบเรียบร้อย และการให้บริการประชาชนในพื้นที่ เพื่อให้สังคมมีความปลอดภัยและน่าอยู่
        </p>
        <p style={{ color: '#444', lineHeight: '1.8', fontSize: '16px', textIndent: '40px', margin: 0, textAlign: 'justify' }}>
          การแบ่งส่วนราชการภายในประกอบด้วย ฝ่ายอำนวยการ, กลุ่มงานสอบสวน, และศูนย์ปฏิบัติการต่างๆ เพื่อสนับสนุนการทำงานของสถานีตำรวจในสังกัดให้มีประสิทธิภาพสูงสุด มุ่งเน้นการบำบัดทุกข์ บำรุงสุข ให้แก่พี่น้องประชาชนชาวจังหวัดน่าน ตามวิสัยทัศน์ของสำนักงานตำรวจแห่งชาติ
        </p>
      </div>

      {/* อุดมคติตำรวจ */}
      <div style={{ backgroundColor: '#8B0000', color: 'white', padding: '40px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 6px 20px rgba(139,0,0,0.2)' }}>
        <h3 style={{ color: '#D4AF37', margin: '0 0 25px 0', fontSize: '24px', fontWeight: 'bold' }}>อุดมคติตำรวจ</h3>
        <div style={{ fontSize: '18px', lineHeight: '2.2', margin: '0', fontWeight: '400', letterSpacing: '0.5px' }}>
          เคารพเอื้อเฟื้อต่อหน้าที่<br/>
          กรุณาปรานีต่อประชาชน<br/>
          อดทนต่อความเจ็บใจ<br/>
          ไม่หวั่นไหวต่อความยากลำบาก<br/>
          ไม่มักมากในลาภผล<br/>
          มุ่งบำเพ็ญตนให้เป็นประโยชน์แก่ประชาชน<br/>
          ดำรงตนในยุติธรรม<br/>
          กระทำการด้วยปัญญา<br/>
          รักษาความไม่ประมาทเสมอชีวิต
        </div>
      </div>

    </div>
  );
}

import React, { useState } from 'react';

function MuseumPage() {
  const [currentPdf, setCurrentPdf] = useState("/files/project_1.pdf");
  const [activeTitle, setActiveTitle] = useState("1. โครงการปรับปรุงเพื่ออนุรักษ์หอประชุมตำรวจจังหวัดน่าน");

  const museumFiles = [
    { id: 1, title: "1. โครงการปรับปรุงเพื่ออนุรักษ์หอประชุมตำรวจจังหวัดน่าน", file: "/files/project_1.pdf" },
    { id: 2, title: "2. ประวัติเรือนเจ้าราชบุตร (หมอกฟ้า)", file: "/files/history_2.pdf" },
    { id: 3, title: "3. ประวัติพิพิธภัณฑ์ตำรวจน่าน", file: "/files/history_3.pdf" },
    { id: 4, title: "4. ประวัติพระมุนินทร์พิทักษ์บูรพาณาเขต", file: "/files/history_4.pdf" },
    { id: 5, title: "5. พิธีหล่อพระมุนินทร์พิทักษ์บูรพาณาเขต", file: "/files/ceremony_5.pdf" }
  ];

  const handleSelect = (item) => {
    setCurrentPdf(item.file);
    setActiveTitle(item.title);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', fontFamily: '"Sarabun", sans-serif' }}>
      {/* ส่วนหัวข้อเดิม */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ color: '#1C3D5A', fontSize: '28px', borderBottom: '3px solid #D4AF37', display: 'inline-block', paddingBottom: '10px' }}>
          พิพิธภัณฑ์ตำรวจน่าน (Nan Police Museum)
        </h2>
        <p style={{ color: '#666', fontSize: '16px', marginTop: '15px' }}>แหล่งเรียนรู้ประวัติศาสตร์และเกียรติภูมิของตำรวจภูธรจังหวัดน่าน</p>
      </div>

      {/* ข้อมูลการเข้าชมและประวัติเดิม */}
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '2', minWidth: '300px' }}>
            <h3 style={{ color: '#8B0000', borderLeft: '4px solid #D4AF37', paddingLeft: '10px' }}>ประวัติและนิทรรศการ</h3>
            <p style={{ color: '#555', lineHeight: '1.8', textIndent: '30px' }}>พิพิธภัณฑ์ตำรวจน่าน จัดตั้งขึ้นเพื่อรวบรวมและจัดแสดงวัตถุโบราณ อาวุธปืนประจำกาย เครื่องแบบในแต่ละยุคสมัย และเอกสารสำคัญทางประวัติศาสตร์ที่เกี่ยวข้องกับการปฏิบัติงานของเจ้าหน้าที่ตำรวจภูธรจังหวัดน่านตั้งแต่อดีตจนถึงปัจจุบัน</p>
          </div>
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '8px', border: '1px solid #eee' }}>
            <h3 style={{ color: '#1C3D5A', borderBottom: '2px dashed #ccc', paddingBottom: '10px' }}>📍 ข้อมูลการเข้าชม</h3>
            <ul style={{ color: '#555', listStyle: 'none', padding: 0 }}>
              <li><strong>📅 วันทำการ:</strong> จันทร์ - ศุกร์</li>
              <li><strong>⏰ เวลา:</strong> 08.30 - 16.30 น.</li>
              <li><strong>🎟️ อัตราค่าเข้าชม:</strong> ฟรี</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ส่วนเลือกไฟล์ PDF */}
      <div style={{ marginTop: '50px' }}>
        <h3 style={{ color: '#1C3D5A', marginBottom: '20px', borderBottom: '2px solid #D4AF37', paddingBottom: '10px' }}>
          📖 เอกสารประวัติศาสตร์และข้อมูลพิพิธภัณฑ์
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
          {museumFiles.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleSelect(item)}
              style={{ 
                padding: '10px 15px', 
                backgroundColor: currentPdf === item.file ? '#8B0000' : '#1C3D5A', 
                color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' 
              }}
            >
              {item.title.split('.')[0]}
            </button>
          ))}
        </div>

        {/* ส่วนแสดง PDF Viewer */}
        <div style={{ backgroundColor: '#333', padding: '10px', borderRadius: '8px', minHeight: '600px' }}>
          <h4 style={{ color: 'white', margin: '10px' }}>{activeTitle}</h4>
          <iframe 
            src={currentPdf} 
            width="100%" 
            height="700px" 
            style={{ borderRadius: '4px' }}
            title="PDF Viewer"
          />
        </div>
      </div>
    </div>
  );
}

// --- หน้าผู้บังคับบัญชา (Commander) ---
function CommanderPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', minHeight: '50vh', fontFamily: '"Sarabun", "Kanit", sans-serif' }}>
      
      {/* หัวข้อหน้า */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#1C3D5A', fontSize: '28px', borderBottom: '3px solid #D4AF37', display: 'inline-block', paddingBottom: '10px', marginTop: 0 }}>
          ทำเนียบผู้บังคับบัญชา
        </h2>
      </div>

      {/* รูปภาพโครงสร้างผู้บังคับบัญชา */}
      <div style={{ textAlign: 'center' }}>
        <img 
          src="/structure.png" 
          alt="รายนามผู้บังคับบัญชา ตำรวจภูธรจังหวัดน่าน" 
          style={{ 
            width: '100%', 
            maxWidth: '800px', 
            height: 'auto', 
            borderRadius: '8px', 
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)' 
          }} 
        />
      </div>

    </div>
  );
}

// --- หน้าดาวน์โหลด (Download) ---
function DownloadPage() {
  const downloadCardStyle = { 
    flex: '1', 
    minWidth: '300px', 
    backgroundColor: 'white', 
    padding: '35px', 
    borderRadius: '8px', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
    borderTop: '5px solid #1C3D5A' 
  };
  
  const linkStyle = { 
    color: '#444', 
    textDecoration: 'none', 
    display: 'block', 
    padding: '12px 0', 
    borderBottom: '1px solid #eee', 
    transition: 'all 0.3s ease', 
    fontSize: '16px' 
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', minHeight: '60vh', fontFamily: '"Sarabun", "Kanit", sans-serif' }}>
      
      {/* ส่วนหัว */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ color: '#1C3D5A', fontSize: '28px', borderBottom: '3px solid #D4AF37', display: 'inline-block', paddingBottom: '10px', marginTop: 0 }}>
          ศูนย์บริการดาวน์โหลด
        </h2>
        <p style={{ color: '#666', fontSize: '16px', marginTop: '15px' }}>
          แบบฟอร์มคำร้องและเอกสารเผยแพร่สำหรับบริการประชาชน ตำรวจภูธรจังหวัดน่าน
        </p>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* หมวดงานสอบสวน */}
        <div style={{ ...downloadCardStyle, borderTopColor: '#8B0000' }}>
          <h3 style={{ color: '#8B0000', marginTop: 0, paddingBottom: '15px', borderBottom: '2px solid #eee', fontSize: '20px', fontWeight: '500' }}>
            งานสอบสวนและแจ้งความ
          </h3>
          <div style={{ marginTop: '15px' }}>
            <a href="#" style={linkStyle} onMouseOver={(e) => { e.target.style.color = '#8B0000'; e.target.style.paddingLeft = '8px'; }} onMouseOut={(e) => { e.target.style.color = '#444'; e.target.style.paddingLeft = '0'; }}>
              - แบบฟอร์มคำร้องทุกข์/กล่าวโทษ
            </a>
            <a href="#" style={linkStyle} onMouseOver={(e) => { e.target.style.color = '#8B0000'; e.target.style.paddingLeft = '8px'; }} onMouseOut={(e) => { e.target.style.color = '#444'; e.target.style.paddingLeft = '0'; }}>
              - หนังสือมอบอำนาจ (ทั่วไป)
            </a>
            <a href="#" style={linkStyle} onMouseOver={(e) => { e.target.style.color = '#8B0000'; e.target.style.paddingLeft = '8px'; }} onMouseOut={(e) => { e.target.style.color = '#444'; e.target.style.paddingLeft = '0'; }}>
              - แบบฟอร์มแจ้งเอกสารหาย
            </a>
          </div>
        </div>

        {/* หมวดงานจราจร */}
        <div style={{ ...downloadCardStyle, borderTopColor: '#1C3D5A' }}>
          <h3 style={{ color: '#1C3D5A', marginTop: 0, paddingBottom: '15px', borderBottom: '2px solid #eee', fontSize: '20px', fontWeight: '500' }}>
            งานจราจร
          </h3>
          <div style={{ marginTop: '15px' }}>
            <a href="#" style={linkStyle} onMouseOver={(e) => { e.target.style.color = '#1C3D5A'; e.target.style.paddingLeft = '8px'; }} onMouseOut={(e) => { e.target.style.color = '#444'; e.target.style.paddingLeft = '0'; }}>
              - คำร้องขอจัดการจราจร (จัดงาน/ขบวน)
            </a>
            <a href="#" style={linkStyle} onMouseOver={(e) => { e.target.style.color = '#1C3D5A'; e.target.style.paddingLeft = '8px'; }} onMouseOut={(e) => { e.target.style.color = '#444'; e.target.style.paddingLeft = '0'; }}>
              - แบบขออนุญาตใช้เสียงโฆษณา
            </a>
            <a href="#" style={linkStyle} onMouseOver={(e) => { e.target.style.color = '#1C3D5A'; e.target.style.paddingLeft = '8px'; }} onMouseOut={(e) => { e.target.style.color = '#444'; e.target.style.paddingLeft = '0'; }}>
              - คู่มือข้อปฏิบัติกฎหมายจราจรใหม่
            </a>
          </div>
        </div>

        {/* หมวดข้อมูลสาธารณะ */}
        <div style={{ ...downloadCardStyle, borderTopColor: '#D4AF37' }}>
          <h3 style={{ color: '#b58e00', marginTop: 0, paddingBottom: '15px', borderBottom: '2px solid #eee', fontSize: '20px', fontWeight: '500' }}>
            ข้อมูลสาธารณะ (ITA)
          </h3>
          <div style={{ marginTop: '15px' }}>
            <a href="#" style={linkStyle} onMouseOver={(e) => { e.target.style.color = '#D4AF37'; e.target.style.paddingLeft = '8px'; }} onMouseOut={(e) => { e.target.style.color = '#444'; e.target.style.paddingLeft = '0'; }}>
              - แผนปฏิบัติราชการประจำปี
            </a>
            <a href="#" style={linkStyle} onMouseOver={(e) => { e.target.style.color = '#D4AF37'; e.target.style.paddingLeft = '8px'; }} onMouseOut={(e) => { e.target.style.color = '#444'; e.target.style.paddingLeft = '0'; }}>
              - รายงานผลการดำเนินงาน
            </a>
            <a href="#" style={linkStyle} onMouseOver={(e) => { e.target.style.color = '#D4AF37'; e.target.style.paddingLeft = '8px'; }} onMouseOut={(e) => { e.target.style.color = '#444'; e.target.style.paddingLeft = '0'; }}>
              - คู่มือการให้บริการประชาชน
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- หน้าติดต่อเรา (Contact) ---
function ContactPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', minHeight: '60vh', fontFamily: '"Sarabun", "Kanit", sans-serif' }}>
      
      {/* ส่วนหัว */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ color: '#1C3D5A', fontSize: '28px', borderBottom: '3px solid #D4AF37', display: 'inline-block', paddingBottom: '10px', marginTop: 0 }}>
          ติดต่อ-สอบถาม
        </h2>
        <p style={{ color: '#666', fontSize: '16px', marginTop: '15px' }}>
          ตำรวจภูธรจังหวัดน่าน (Nan Provincial Police)
        </p>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* ข้อมูลการติดต่อ */}
        <div style={{ flex: '1', minWidth: '350px', backgroundColor: 'white', padding: '40px 35px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderTop: '5px solid #1C3D5A' }}>
          <h3 style={{ color: '#8B0000', borderBottom: '2px solid #eee', paddingBottom: '15px', marginTop: 0, fontSize: '20px', fontWeight: '500' }}>
            รายละเอียดการติดต่อ
          </h3>
          
          <div style={{ marginTop: '25px' }}>
            <div style={{ borderLeft: '4px solid #D4AF37', paddingLeft: '15px', marginBottom: '30px' }}>
              <strong style={{ color: '#1C3D5A', display: 'block', marginBottom: '8px', fontSize: '18px' }}>ที่ตั้งหน่วยงาน</strong>
              <span style={{ color: '#444', lineHeight: '1.8', fontSize: '16px' }}>
                ตำรวจภูธรจังหวัดน่าน<br/>
                ๕๒ ถนนสุริยพงษ์ ตำบลในเวียง<br/>
                อำเภอเมืองน่าน จังหวัดน่าน ๕๕๐๐๐
              </span>
            </div>

            <div style={{ borderLeft: '4px solid #D4AF37', paddingLeft: '15px', marginBottom: '30px' }}>
              <strong style={{ color: '#1C3D5A', display: 'block', marginBottom: '8px', fontSize: '18px' }}>หมายเลขโทรศัพท์</strong>
              <span style={{ color: '#444', fontSize: '16px', display: 'block', marginBottom: '10px' }}>
                ๐-๕๔๗๗-๑๓๗๙ (งานธุรการ)
              </span>
              <div style={{ backgroundColor: '#fdeaea', padding: '10px 15px', borderRadius: '4px', display: 'inline-block', border: '1px solid #f5c6c6' }}>
                <strong style={{ color: '#8B0000', fontSize: '16px' }}>เหตุด่วนเหตุร้าย โทร. 191</strong>
              </div>
            </div>

            <div style={{ borderLeft: '4px solid #D4AF37', paddingLeft: '15px' }}>
              <strong style={{ color: '#1C3D5A', display: 'block', marginBottom: '8px', fontSize: '18px' }}>ไปรษณีย์อิเล็กทรอนิกส์ (E-mail)</strong>
              <span style={{ color: '#444', fontSize: '16px' }}>
                saraban_nan@police.go.th
              </span>
            </div>
          </div>
        </div>

        {/* แผนที่ (ดึงจาก Google Maps อัตโนมัติ) */}
        <div style={{ flex: '1.5', minWidth: '350px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #ddd' }}>
          <iframe 
            src="https://maps.google.com/maps?q=ตำรวจภูธรจังหวัดน่าน&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: '0', minHeight: '400px' }} 
            allowFullScreen="" 
            loading="lazy"
            title="แผนที่ตำรวจภูธรจังหวัดน่าน"
          ></iframe>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 3. ส่วนตัวจัดการเส้นทาง (Router & App)
// ==========================================
function App() {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        
        {/* --- กลุ่มหน้าเว็บสำหรับประชาชน (ครอบด้วย MainLayout) --- */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/commander" element={<MainLayout><CommanderPage /></MainLayout>} />
        <Route path="/museum" element={<MainLayout><MuseumPage /></MainLayout>} />
        <Route path="/download" element={<MainLayout><DownloadPage /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />

        {/* --- กลุ่มระบบหลังบ้าน (แยกอิสระ) --- */}
        <Route path="/admin" element={isAdmin ? <AdminDashboard setIsAdmin={setIsAdmin} /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={isAdmin ? <Navigate to="/admin" /> : <AdminLogin setIsAdmin={setIsAdmin} />} />
        
      </Routes>
    </Router>
  );
}

export default App;
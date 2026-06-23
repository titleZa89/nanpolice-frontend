import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddAnnouncement from './AddAnnouncement';

function AdminDashboard({ setIsAdmin }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        if(window.confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
            localStorage.removeItem('token');
            setIsAdmin(false);
            navigate('/admin/login');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: '"Sarabun", "Kanit", sans-serif' }}>
            
            {/* แถบเมนูด้านซ้าย (Sidebar) */}
            <aside style={{ width: '260px', backgroundColor: '#1C3D5A', color: 'white', display: 'flex', flexDirection: 'column', boxShadow: '2px 0 10px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '30px 20px', textAlign: 'center', borderBottom: '1px solid #2c5277', backgroundColor: '#152d43' }}>
                    <img src="/logo.png" alt="โลโก้" style={{ width: '70px', height: '70px', objectFit: 'contain', marginBottom: '10px' }} />
                    <h2 style={{ margin: 0, fontSize: '18px', color: '#D4AF37', fontWeight: '500' }}>ระบบจัดการหลังบ้าน</h2>
                    <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#aaa' }}>ตำรวจภูธรจังหวัดน่าน</p>
                </div>
                
                <nav style={{ flex: 1, padding: '20px 0' }}>
                    <div style={{ padding: '15px 25px', backgroundColor: '#800000', cursor: 'pointer', borderLeft: '5px solid #D4AF37', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>📢</span> จัดการข่าวประกาศ
                    </div>
                    {/* อนาคตสามารถเพิ่มเมนูอื่นๆ ตรงนี้ได้ */}
                    <div style={{ padding: '15px 25px', cursor: 'not-allowed', color: '#888', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>👥</span> จัดการผู้ใช้งาน (เร็วๆ นี้)
                    </div>
                </nav>

                <div style={{ padding: '20px', borderTop: '1px solid #2c5277' }}>
                    <button 
                        onClick={handleLogout} 
                        style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'all 0.3s' }}
                        onMouseOver={(e) => { e.target.style.backgroundColor = '#ff6b6b'; e.target.style.color = 'white'; }} 
                        onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#ff6b6b'; }}
                    >
                        🚪 ออกจากระบบ
                    </button>
                </div>
            </aside>

            {/* พื้นที่จัดการเนื้อหาด้านขวา */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                {/* Top Header ของ Admin */}
                <header style={{ backgroundColor: 'white', padding: '20px 30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '20px', color: '#1C3D5A', fontWeight: '500' }}>ส่วนจัดการเนื้อหาเว็บไซต์</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '35px', height: '35px', backgroundColor: '#D4AF37', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold' }}>A</div>
                        <span style={{ fontWeight: '500', color: '#333' }}>ผู้ดูแลระบบ</span>
                    </div>
                </header>

                {/* Content Area */}
                <div style={{ padding: '30px', overflowY: 'auto', flex: 1 }}>
                    <AddAnnouncement />
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
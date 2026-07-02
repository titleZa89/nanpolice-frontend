import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddAnnouncement from './AddAnnouncement';

function AdminDashboard({ setIsAdmin }) {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [editingNews, setEditingNews] = useState(null); // สำหรับเก็บข้อมูลตัวที่กำลังแก้

    // ดึงข้อมูลข่าวทั้งหมดมาแสดง
    const fetchNews = async () => {
        try {
            const res = await axios.get('https://nanpolice-api.onrender.com/api/announcements');
            setNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchNews(); }, []);

    // ฟังก์ชันลบข่าว
    const handleDelete = async (id) => {
        if (window.confirm('ต้องการลบข่าวนี้ใช่หรือไม่?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`https://nanpolice-api.onrender.com/api/announcements/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('ลบสำเร็จ');
                fetchNews(); // โหลดข้อมูลใหม่
            } catch (err) {
                alert('ลบข้อมูลไม่สำเร็จ');
            }
        }
    };

    const handleLogout = () => {
        if(window.confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
            localStorage.removeItem('token');
            setIsAdmin(false);
            navigate('/admin/login');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: '"Sarabun", sans-serif' }}>
            {/* Sidebar */}
            <aside style={{ width: '260px', backgroundColor: '#1C3D5A', color: 'white', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '30px 20px', textAlign: 'center', backgroundColor: '#152d43' }}>
                    <img src="/logo.png" style={{ width: '70px', marginBottom: '10px' }} />
                    <h2 style={{ fontSize: '18px', color: '#D4AF37' }}>ระบบจัดการหลังบ้าน</h2>
                </div>
                <nav style={{ flex: 1, padding: '20px 0' }}>
                    <div style={{ padding: '15px 25px', backgroundColor: '#800000', borderLeft: '5px solid #D4AF37' }}>📢 จัดการข่าวประกาศ</div>
                </nav>
                <div style={{ padding: '20px' }}>
                    <button onClick={handleLogout} style={{ width: '100%', padding: '10px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🚪 ออกจากระบบ</button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '30px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ color: '#1C3D5A' }}>ส่วนจัดการเนื้อหา</h2>
                </header>

                <div style={{ marginBottom: '30px' }}>
                    <AddAnnouncement onAddSuccess={fetchNews} />
                </div>

                {/* ตารางรายการข่าว */}
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <h3>รายการประกาศทั้งหมด ({news.length} รายการ)</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>ลำดับ</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>หัวข้อ</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.map((item, index) => (
                                <tr key={item.id}>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>{index + 1}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>{item.title}</td>
                                    <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>
                                        <button 
                                            style={{ marginRight: '10px', backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                            onClick={() => alert('ฟังก์ชันแก้ไข: สร้างฟอร์ม Edit แล้วเรียก API PUT ไปที่ /api/announcements/'+item.id)}
                                        >แก้ไข</button>
                                        <button 
                                            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                            onClick={() => handleDelete(item.id)}
                                        >ลบ</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
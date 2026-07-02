import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddAnnouncement from './AddAnnouncement';

function AdminDashboard({ setIsAdmin }) {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [editingNews, setEditingNews] = useState(null);

    const fetchNews = async () => {
        try {
            const res = await axios.get('https://nanpolice-api.onrender.com/api/announcements');
            setNews(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchNews(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm('ต้องการลบข่าวนี้ใช่หรือไม่?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`https://nanpolice-api.onrender.com/api/announcements/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchNews();
            } catch (err) { alert('ลบไม่สำเร็จ'); }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData(e.target);
        
        try {
            await axios.put(`https://nanpolice-api.onrender.com/api/announcements/${editingNews.id}`, formData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            });
            alert('แก้ไขสำเร็จ');
            setEditingNews(null);
            fetchNews();
        } catch (err) { alert('แก้ไขไม่สำเร็จ'); }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f4f8', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
            <style>{`
                @media (max-width: 768px) {
                    .desktop-table { display: none !important; }
                    .mobile-card { display: block !important; }
                }
                @media (min-width: 769px) {
                    .desktop-table { display: table !important; }
                    .mobile-card { display: none !important; }
                }
            `}</style>

            {/* Sidebar */}
            <aside style={{ width: window.innerWidth < 768 ? '100%' : '260px', backgroundColor: '#1C3D5A', color: 'white', padding: '20px' }}>
                <h2 style={{ fontSize: '18px', color: '#D4AF37', textAlign: 'center' }}>ระบบจัดการหลังบ้าน</h2>
                <button onClick={() => { localStorage.removeItem('token'); setIsAdmin(false); navigate('/admin/login'); }} style={{ width: '100%', padding: '10px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', cursor: 'pointer', marginTop: '20px' }}>🚪 ออกจากระบบ</button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '20px' }}>
                <AddAnnouncement onAddSuccess={fetchNews} />

                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                    <h3>รายการประกาศทั้งหมด ({news.length})</h3>
                    
                    {/* ตารางสำหรับ Desktop */}
                    <table className="desktop-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                            {news.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '10px' }}>{item.title}</td>
                                    <td style={{ padding: '10px', textAlign: 'right' }}>
                                        <button onClick={() => setEditingNews(item)} style={{ marginRight: '10px', backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>แก้ไข</button>
                                        <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>ลบ</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* รายการสำหรับ Mobile */}
                    <div className="mobile-card" style={{ display: 'none' }}>
                        {news.map((item) => (
                            <div key={item.id} style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.title}</span>
                                <div>
                                    <button onClick={() => setEditingNews(item)} style={{ backgroundColor: '#ffc107', border: 'none', padding: '5px 8px', marginRight: '5px' }}>แก้ไข</button>
                                    <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 8px' }}>ลบ</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Modal แก้ไข */}
            {editingNews && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <form onSubmit={handleUpdate} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '400px' }}>
                        <h3>แก้ไขประกาศ</h3>
                        <input name="title" defaultValue={editingNews.title} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} required />
                        <textarea name="description" defaultValue={editingNews.description} style={{ width: '100%', height: '80px', marginBottom: '10px', padding: '8px' }} />
                        <input type="file" name="document" style={{ marginBottom: '10px' }} />
                        <input type="hidden" name="old_document_url" value={editingNews.document_url} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>บันทึก</button>
                            <button type="button" onClick={() => setEditingNews(null)} style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none' }}>ยกเลิก</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddAnnouncement() {
    const [newsList, setNewsList] = useState([]);
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('1');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('https://nanpolice-api.onrender.com/api/announcements');
            setNewsList(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category_id', categoryId);
        formData.append('description', description);
        if (file) formData.append('document', file);

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': token } };

            if (editingId) {
                await axios.put(`https://nanpolice-api.onrender.com/api/announcements/${editingId}`, formData, config);
                alert('✅ แก้ไขข้อมูลสำเร็จ!');
            } else {
                await axios.post('https://nanpolice-api.onrender.com/api/announcements', formData, config);
                alert('✅ บันทึกข้อมูลใหม่สำเร็จ!');
            }
            
            handleCancelEdit();
            fetchNews();
            
        } catch (error) {
            console.error('Error:', error);
            const errorMsg = error.response?.data?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
            alert('❌ ' + errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('⚠️ คุณแน่ใจหรือไม่ว่าต้องการลบประกาศนี้? ข้อมูลจะไม่สามารถกู้คืนได้')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`https://nanpolice-api.onrender.com/api/announcements/${id}`, {
                    headers: { 'Authorization': token }
                });
                alert('🗑️ ลบข้อมูลสำเร็จ!');
                fetchNews(); 
            } catch (error) {
                const errorMsg = error.response?.data?.message || error.response?.data?.error || 'ลบข้อมูลไม่สำเร็จ';
                alert('❌ ' + errorMsg);
            }
        }
    };

    const handleEditClick = (news) => {
        setEditingId(news.id);
        setTitle(news.title);
        setCategoryId(news.category_id);
        setDescription(news.description || '');
        setFile(null); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTitle('');
        setCategoryId('1');
        setDescription('');
        setFile(null);
        document.getElementById('fileInput').value = ''; 
    };

    return (
        <div style={{ maxWidth: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* ---------------- การ์ดฟอร์มเพิ่ม/แก้ไขข้อมูล ---------------- */}
            <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e1e5eb' }}>
                <div style={{ backgroundColor: editingId ? '#D4AF37' : '#1C3D5A', padding: '15px 25px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background-color 0.3s' }}>
                    <span style={{ fontSize: '20px' }}>{editingId ? '✏️' : '📝'}</span>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>
                        {editingId ? 'แก้ไขข่าวประกาศ' : 'เพิ่มข่าวประกาศใหม่'}
                    </h3>
                </div>
                
                <form onSubmit={handleSubmit} style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1', minWidth: '200px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>ประเภทประกาศ <span style={{color: '#e74c3c'}}>*</span></label>
                            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px', backgroundColor: '#fff' }}>
                                <option value="1">ข่าวประกวดราคา</option>
                                <option value="2">ประกาศตำรวจ</option>
                            </select>
                        </div>

                        <div style={{ flex: '2', minWidth: '300px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>หัวข้อประกาศ <span style={{color: '#e74c3c'}}>*</span></label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="กรอกหัวข้อประกาศ..." style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '15px' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>รายละเอียดโดยย่อ</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="กรอกรายละเอียดเพิ่มเติม (ถ้ามี)..." style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '15px', resize: 'vertical' }}></textarea>
                    </div>

                    <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px dashed #adb5bd' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                            📄 แนบเอกสาร (PDF) {editingId && <span style={{ color: '#e74c3c', fontSize: '14px', fontWeight: 'normal' }}>*เลือกไฟล์ใหม่หากต้องการเปลี่ยนไฟล์เดิม</span>}
                        </label>
                        <input id="fileInput" type="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf" style={{ width: '100%', padding: '10px', fontSize: '15px' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginTop: '10px', justifyContent: 'flex-end' }}>
                        {editingId && (
                            <button type="button" onClick={handleCancelEdit} style={{ padding: '12px 25px', backgroundColor: '#e2e6ea', color: '#333', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', fontWeight: '500' }}>
                                ยกเลิก
                            </button>
                        )}
                        <button type="submit" disabled={loading} style={{ padding: '12px 35px', backgroundColor: loading ? '#ccc' : (editingId ? '#D4AF37' : '#8B0000'), color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background-color 0.3s' }}>
                            {loading ? '⏳ กำลังบันทึก...' : (editingId ? '💾 บันทึกการแก้ไข' : '📢 บันทึกและประกาศข่าว')}
                        </button>
                    </div>
                </form>
            </div>

            
            <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e1e5eb' }}>
                
                
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f4f6f9', borderBottom: '2px solid #ddd' }}>
                                <th style={{ padding: '15px 25px', width: '5%', color: '#495057', fontWeight: '500' }}>ลำดับ</th>
                                <th style={{ padding: '15px 25px', width: '45%', color: '#495057', fontWeight: '500' }}>หัวข้อประกาศ</th>
                                <th style={{ padding: '15px 25px', width: '15%', color: '#495057', fontWeight: '500' }}>ประเภท</th>
                                <th style={{ padding: '15px 25px', width: '15%', color: '#495057', fontWeight: '500' }}>วันที่ลง</th>
                                <th style={{ padding: '15px 25px', width: '20%', textAlign: 'center', color: '#495057', fontWeight: '500' }}>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newsList.length > 0 ? (
                                newsList.map((news, index) => (
                                    <tr key={news.id} style={{ borderBottom: '1px solid #eee', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                        <td style={{ padding: '15px 25px', color: '#666' }}>{index + 1}</td>
                                        <td style={{ padding: '15px 25px', color: '#222', fontWeight: '500', lineHeight: '1.4' }}>{news.title}</td>
                                        <td style={{ padding: '15px 25px' }}>
                                            <span style={{ 
                                                backgroundColor: news.category_id === 1 ? '#e3f2fd' : '#fdeaea', 
                                                color: news.category_id === 1 ? '#1e88e5' : '#e53935', 
                                                padding: '5px 12px', 
                                                borderRadius: '20px', 
                                                fontSize: '13px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {news.category_name}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px 25px', color: '#666', fontSize: '14px' }}>
                                            {new Date(news.created_at).toLocaleDateString('th-TH')}
                                        </td>
                                        <td style={{ padding: '15px 25px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                            <button 
                                                onClick={() => handleEditClick(news)} 
                                                style={{ backgroundColor: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px', fontSize: '13px', transition: 'all 0.2s' }}
                                                onMouseOver={(e) => { e.target.style.backgroundColor = '#D4AF37'; e.target.style.color = 'white'; }} 
                                                onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#D4AF37'; }}
                                            >
                                                ✏️ แก้ไข
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(news.id)} 
                                                style={{ backgroundColor: 'transparent', color: '#e74c3c', border: '1px solid #e74c3c', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' }}
                                                onMouseOver={(e) => { e.target.style.backgroundColor = '#e74c3c'; e.target.style.color = 'white'; }} 
                                                onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#e74c3c'; }}
                                            >
                                                🗑️ ลบ
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#999', fontSize: '16px' }}>ยังไม่มีข้อมูลประกาศในระบบ</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    );
}

export default AddAnnouncement;
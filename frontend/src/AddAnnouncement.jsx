import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddAnnouncement({ onAddSuccess }) {
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('1');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // รับฟังก์ชัน fetchNews จาก Dashboard ผ่าน onAddSuccess มาใช้
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
            const config = { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } };

            if (editingId) {
                await axios.put(`https://nanpolice-api.onrender.com/api/announcements/${editingId}`, formData, config);
                alert('✅ แก้ไขข้อมูลสำเร็จ!');
            } else {
                await axios.post('https://nanpolice-api.onrender.com/api/announcements', formData, config);
                alert('✅ บันทึกข้อมูลใหม่สำเร็จ!');
            }
            
            handleCancelEdit();
            if (onAddSuccess) onAddSuccess(); // อัปเดตตารางใน Dashboard
        } catch (error) {
            console.error('Error:', error);
            alert('❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTitle('');
        setCategoryId('1');
        setDescription('');
        setFile(null);
        if(document.getElementById('fileInput')) document.getElementById('fileInput').value = ''; 
    };

    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e1e5eb' }}>
            <div style={{ backgroundColor: '#1C3D5A', padding: '15px 25px', color: 'white' }}>
                <h3 style={{ margin: 0, fontSize: '18px' }}>📝 เพิ่ม/แก้ไขข่าวประกาศ</h3>
            </div>
            
            <form onSubmit={handleSubmit} style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>ประเภท</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={{ width: '100%', padding: '10px' }}>
                            <option value="1">ข่าวประกวดราคา</option>
                            <option value="2">ประกาศตำรวจ</option>
                        </select>
                    </div>
                    <div style={{ flex: '2' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>หัวข้อ</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
                    </div>
                </div>

                <label>รายละเอียด</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '10px' }} />

                <input id="fileInput" type="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf" />

                <button type="submit" disabled={loading} style={{ padding: '12px', backgroundColor: '#8B0000', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                </button>
            </form>
        </div>
    );
}

export default AddAnnouncement;
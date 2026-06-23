import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin({ setIsAdmin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            // ยิง API ไปตรวจสอบรหัสผ่านกับ Backend ของจริง
            const res = await axios.post('https://nanpolice-api.onrender.com/api/login', { 
                username, 
                password 
            });

            // ถ้าผ่าน จะได้ Token ของจริงมาเซฟไว้ในเครื่อง
            localStorage.setItem('token', res.data.token); 
            setIsAdmin(true);
            navigate('/admin'); // เด้งไปหน้า Dashboard
            
        } catch (err) {
            // ถ้า Backend ส่ง error 401 กลับมา แปลว่ารหัสผิด
            alert('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f9' }}>
            <div style={{ width: '400px', padding: '40px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <img src="/logo.png" alt="โลโก้" style={{ width: '80px', marginBottom: '20px' }} />
                <h2 style={{ color: '#8B0000', marginBottom: '30px' }}>เข้าสู่ระบบหลังบ้าน</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="ชื่อผู้ใช้ (Username)" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                    <input type="password" placeholder="รหัสผ่าน (Password)" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '25px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                    <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#8B0000', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>เข้าสู่ระบบ</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
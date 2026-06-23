import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://nanpolice-api.onrender.com/api/login', { username, password });
            localStorage.setItem('token', res.data.token); // เก็บกุญแจเข้าบ้าน
            onLoginSuccess(); // ถ้า Login สำเร็จ ให้เด้งไปหน้าเพิ่มข่าว
        } catch (err) {
            alert('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#8B0000' }}>เข้าสู่ระบบหลังบ้าน</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '20px' }} onChange={e => setPassword(e.target.value)} />
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#8B0000', color: '#fff', border: 'none', cursor: 'pointer' }}>Login</button>
            </form>
        </div>
    );
}
export default Login;
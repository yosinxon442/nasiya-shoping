import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import '../../styles/pages/settings/About.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="page-header">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/settings')}
          type="text"
        />
        <h1>Dastur haqida</h1>
      </div>

      <div className="about-content">
        <div className="app-info">
          <img src="/imgs/LOGO.svg" alt="Logo" className="app-logo" />
          <h2>Nasiya 1.0</h2>
          <p className="version">Versiya 1.0.0</p>
        </div>

        <div className="app-description">
          <h3>Dastur haqida ma'lumot</h3>
          <p>
            Nasiya - bu savdo va xizmat ko'rsatish sohasidagi tadbirkorlar uchun mo'ljallangan 
            zamonaviy nasiya boshqaruv tizimi. Dastur orqali siz mijozlaringizning nasiya 
            to'lovlarini oson va samarali boshqarishingiz mumkin.
          </p>
        </div>

        <div className="features">
          <h3>Asosiy imkoniyatlar</h3>
          <ul>
            <li>Mijozlar bazasini boshqarish</li>
            <li>Nasiya to'lovlarini kuzatish</li>
            <li>To'lov eslatmalari</li>
            <li>Hisobotlar tayyorlash</li>
            <li>Ko'p foydalanuvchilar bilan ishlash</li>
          </ul>
        </div>

        <div className="contact-info">
          <h3>Bog'lanish</h3>
          <p>Telefon: +998 90 123 45 67</p>
          <p>Email: info@nasiya.uz</p>
          <p>Veb-sayt: www.nasiya.uz</p>
        </div>

        <div className="copyright">
          <p>© 2024 Nasiya. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </div>
  );
};

export default About; 
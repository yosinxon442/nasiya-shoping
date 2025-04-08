import React from 'react';
import '../styles/pages/Settings.css';
import { FaChevronRight, FaSignOutAlt } from 'react-icons/fa';
import { useStore } from '../hooks/useStore';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const settingsList = [
  { title: "Shaxsiy ma'lumotlar", link: '/settings/personal-info' },
  { title: 'Yordam', link: '/settings/help' },
  { title: 'Taklif va fikrlar', link: '/settings/feedback' },
  { title: 'Dastur haqida', link: '/settings/about' },
];

const SettingsPage = () => {
  const { logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    Modal.confirm({
      title: 'Tizimdan chiqish',
      content: 'Haqiqatan ham tizimdan chiqmoqchimisiz?',
      okText: 'Ha',
      cancelText: "Yo'q",
      onOk: () => {
        logout();
        navigate('/login');
      },
    });
  };

  const handleNavigation = (link: string) => {
    navigate(link);
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Sozlamalar</h1>
      <div className="settings-list">
        {settingsList.map((item, index) => (
          <div className="settings-item" key={index}>
            <button 
              className="settings-link"
              onClick={() => handleNavigation(item.link)}
            >
              <span>{item.title}</span>
              <FaChevronRight className="chevron-icon" />
            </button>
          </div>
        ))}
      </div>

      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" /> Hisobdan chiqish
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;

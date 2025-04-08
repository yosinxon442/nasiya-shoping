import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined, PlusOutlined, CalendarOutlined } from "@ant-design/icons";
import { FaUserCircle, FaHome, FaUsers, FaChartBar, FaCog } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import "../styles/pages/Home.css";

function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useStore();
  const navigate = useNavigate();

  return (
    <div className="Home">
      <div className="container">
        <div className="main-content">
          {/* User Card */}
          <div className="user-card">
            <div className="user-header">
              <div className="user-avatar">
                <FaUserCircle size={32} color="#666" />
              </div>
              <span className="user-name">{user?.data?.login || "Foydalanuvchi"}</span>
              <button 
                className="calendar-button"
                onClick={() => navigate('/calendar')}
              >
                <CalendarOutlined style={{ fontSize: "24px", color: "#735CD8" }} />
              </button>
            </div>

            {/* Total Amount */}
            <div className="total-amount">
              <div className="total-amount__label">Umumiy nasiya:</div>
              <div className="total-amount__value">
                {isVisible ? "135 214 200 so'm" : "••••••••"}
              </div>
              <button 
                className="visibility-toggle"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            </div>

            {/* Stats */}
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-label">Kechiktirilgan to'lovlar</div>
                <div className="stat-value red">26</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Mijozlar soni</div>
                <div className="stat-value green">151</div>
              </div>
            </div>
          </div>

          {/* Wallet Section */}
          <div className="wallet-section">
            <div className="wallet-header">
              <h2>Hamyoningiz</h2>
            </div>
            <div className="wallet-amount">
              <div className="wallet-amount__info">
                <span className="wallet-amount__label">Hisobingizda</span>
                <span className="wallet-amount__value">300 000 so'm</span>
              </div>
              <button className="add-button">
                <PlusOutlined />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <div className="nav-container">
            <NavLink to="/" className="nav-item active">
              <FaHome className="nav-icon" />
              <span>Asosiy</span>
            </NavLink>
            <NavLink to="/customers" className="nav-item">
              <FaUsers className="nav-icon" />
              <span>Mijozlar</span>
            </NavLink>
            <NavLink to="/reports" className="nav-item">
              <FaChartBar className="nav-icon" />
              <span>Hisobot</span>
            </NavLink>
            <NavLink to="/settings" className="nav-item">
              <FaCog className="nav-icon" />
              <span>Sozlamalar</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Home;

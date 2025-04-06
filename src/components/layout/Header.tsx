import { Link, NavLink } from "react-router-dom";
import { Select } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useStore } from "../../hooks/useStore";
import "../../styles/components/Header.css";

function Header() {
  const { language, setLanguage } = useStore();

  return (
    <div className="Header">
      <div className="container">
        <Link to="/">
          <img src="/imgs/LOGO.svg" alt="Logo" className="Header__logo" />
        </Link>

        <div className="Header__links">
          <NavLink to="/" className="Header__link">
            <HomeOutlined className="Header__icon" />
            <p>Asosiy</p>
          </NavLink>
          <NavLink to="/customers" className="Header__link">
            <UserOutlined className="Header__icon" />
            <p>Mijozlar</p>
          </NavLink>
          <NavLink to="/reports" className="Header__link">
            <FileTextOutlined className="Header__icon" />
            <p>Hisobot</p>
          </NavLink>
          <NavLink to="/settings" className="Header__link">
            <SettingOutlined className="Header__icon" />
            <p>Sozlamalar</p>
          </NavLink>
        </div>

        <div className="Header__content">
          <Select
            value={language}
            onChange={setLanguage}
            style={{ width: 100 }}
            options={[
              { value: "uz", label: "🇺🇿 UZ" },
              { value: "en", label: "🇬🇧 EN" },
              { value: "ru", label: "🇷🇺 RU" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

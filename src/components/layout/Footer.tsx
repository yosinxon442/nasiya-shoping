import '../../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>Nasiya Savdo</h3>
          <p>Sifatli mahsulotlar. Quvonchli xaridlar. Ishonchli xizmat.</p>
        </div>

        <div className="footer-links">
          <h4>Foydali havolalar</h4>
          <ul>
            <li><a href="/about">Biz haqimizda</a></li>
            <li><a href="/products">Mahsulotlar</a></li>
            <li><a href="/contact">Bog‘lanish</a></li>
            <li><a href="/faq">Savol-javoblar</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Aloqa</h4>
          <p>Telefon: <a href="tel:+998901234567">+998 90 123 45 67</a></p>
          <p>Email: <a href="mailto:support@nasiyasavdo.uz">support@nasiyasavdo.uz</a></p>
          <div className="social-icons">
            <a href="https://t.me/nasiyasavdo" target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href="https://facebook.com/nasiyasavdo" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com/nasiyasavdo" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} <b>Nasiya Savdo</b>. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  );
};

export default Footer;

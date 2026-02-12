export default function FooterSection() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <span className="logo-icon small">🌾</span>
              <h3 className="footer-logo">KisanSarthi</h3>
            </div>
            <p className="footer-tagline">
              Building financial resilience for every Indian farmer. Offline-first, free forever.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#ai-assistant">Sarthi AI</a>
                </li>
                <li>
                  <a href="#start-now">Simulation</a>
                </li>
                <li>
                  <a href="#stories">Success Stories</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#mission">Our Mission</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="#privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="#terms">Terms of Service</a>
                </li>
                <li>
                  <a href="#data">Data Safety</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 KisanSarthi. Made with 💚 for India.</p>
        </div>
      </div>
    </footer>
  )
}


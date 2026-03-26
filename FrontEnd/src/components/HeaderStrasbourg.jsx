import React, { useState } from "react";
import BrandLogo from "./BrandLogo";

const UNISTRA_RED = "#C8002B";

const navItems = [
  { label: "Formation", href: "https://www.unistra.fr/fr/formation" },
  { label: "Recherche", href: "https://www.unistra.fr/fr/recherche" },
  { label: "Innovation & entreprise", href: "https://entreprises.unistra.fr" },
  { label: "International", href: "https://www.unistra.fr/fr/international" },
  { label: "Campus & vie", href: "https://www.unistra.fr/fr/campus" },
  { label: "Actualités", href: "https://www.unistra.fr/fr/actualites" },
];

const audienceLinks = [
  { label: "Lycéen(ne)", href: "https://lyceen.unistra.fr" },
  { label: "Étudiant(e)", href: "https://bienvenue.unistra.fr" },
  { label: "Doctorant(e)", href: "https://doctorat.unistra.fr" },
  { label: "Alumni", href: "https://www.unistra.fr/fr/universite/partenaires/reseau-alumni" },
  { label: "Entreprise", href: "https://entreprises.unistra.fr" },
  { label: "Journaliste", href: "https://www.unistra.fr/fr/universite/presse-et-medias" },
  { label: "Citoyen(ne)", href: "https://www.unistra.fr/fr/societe" },
];

const HeaderStrasbourg = () => {
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{ fontFamily: "'Source Sans Pro', Arial, sans-serif", position: "sticky", top: 0, zIndex: 1000 }}>
      {/* ── Top utility bar ── */}
      <div style={{ backgroundColor: UNISTRA_RED, padding: "5px 0" }}>
        <div style={{
          maxWidth: "1260px", margin: "0 auto", padding: "0 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          {/* Language selector */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <a
              href="https://www.unistra.fr/fr"
              style={{ color: "white", textDecoration: "none", fontSize: "13px", fontWeight: "700", borderBottom: "2px solid white", paddingBottom: "1px" }}
            >
              fr
            </a>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>|</span>
            <a
              href="https://www.unistra.fr/en"
              style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "13px" }}
            >
              en
            </a>
          </div>
          {/* Utility links */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a href="https://www.unistra.fr/fr/faq" style={utilLinkStyle}>FAQ</a>
            <a href="https://www.unistra.fr/fr/contact" style={utilLinkStyle}>Contact</a>
            <a
              href="https://www.unistra.fr/node/807"
              style={{
                ...utilLinkStyle,
                border: "1px solid rgba(255,255,255,0.6)",
                padding: "2px 10px",
                borderRadius: "3px",
              }}
            >
              Faire un don
            </a>
          </div>
        </div>
      </div>

      {/* ── Main header band ── */}
      <div style={{ backgroundColor: "white", borderBottom: `3px solid ${UNISTRA_RED}` }}>
        <div style={{
          maxWidth: "1260px", margin: "0 auto", padding: "10px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <a href="https://www.unistra.fr" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <BrandLogo alt="Université de Strasbourg" style={{ height: "56px" }} />
          </a>

          {/* Desktop navigation */}
          <nav style={{ display: "flex", alignItems: "center", gap: "4px" }} aria-label="Navigation principale">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} style={navLinkStyle} target="_blank" rel="noopener noreferrer"
                onMouseEnter={e => { e.currentTarget.style.color = UNISTRA_RED; e.currentTarget.style.borderBottom = `2px solid ${UNISTRA_RED}`; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#1A1A1A"; e.currentTarget.style.borderBottom = "2px solid transparent"; }}
              >
                {item.label}
              </a>
            ))}

            {/* "Je suis" audience dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setAudienceOpen(prev => !prev)}
                aria-expanded={audienceOpen}
                style={{
                  background: UNISTRA_RED, color: "white", border: "none",
                  padding: "7px 14px", borderRadius: "3px", cursor: "pointer",
                  fontSize: "14px", fontWeight: "600", fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: "6px",
                }}
              >
                Je suis…
                <svg width="10" height="6" viewBox="0 0 10 6" fill="white">
                  <path d={audienceOpen ? "M9 5L5 1 1 5" : "M1 1l4 4 4-4"} stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
              {audienceOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 6px)",
                  backgroundColor: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  borderTop: `3px solid ${UNISTRA_RED}`, minWidth: "180px",
                  zIndex: 200,
                }}>
                  {audienceLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block", padding: "10px 16px",
                        color: "#1A1A1A", textDecoration: "none", fontSize: "14px",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#FFF5F7"; e.currentTarget.style.color = UNISTRA_RED; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = "#1A1A1A"; }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            style={{
              display: "none", background: "none", border: "none",
              cursor: "pointer", padding: "8px",
            }}
            aria-label="Menu"
            className="unistra-hamburger"
          >
            <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "#1A1A1A", margin: "5px 0" }} />
            <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "#1A1A1A", margin: "5px 0" }} />
            <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "#1A1A1A", margin: "5px 0" }} />
          </button>
        </div>

        {/* Mobile menu (shown on narrow screens via CSS class) */}
        {mobileOpen && (
          <div style={{ borderTop: "1px solid #e0e0e0", padding: "12px 24px" }} className="unistra-mobile-menu">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} style={{ display: "block", padding: "10px 0", color: "#1A1A1A", textDecoration: "none", fontSize: "15px", borderBottom: "1px solid #f0f0f0" }}>
                {item.label}
              </a>
            ))}
            <div style={{ marginTop: "12px" }}>
              {audienceLinks.map((link) => (
                <a key={link.label} href={link.href} style={{ display: "block", padding: "8px 0", color: UNISTRA_RED, textDecoration: "none", fontSize: "14px" }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const utilLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "13px",
};

const navLinkStyle = {
  color: "#1A1A1A",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "600",
  padding: "6px 8px",
  borderBottom: "2px solid transparent",
  transition: "color 0.15s, border-color 0.15s",
};

export default HeaderStrasbourg;

import React, { useState } from "react";
import BrandLogo from "./BrandLogo";
import { runtimeConfig } from "../config/runtime";

const NAV_ITEMS = [
  {
    label: "Formation",
    href: "https://www.unistra.fr/fr/formation",
    children: [
      { label: "S'orienter", href: "https://www.unistra.fr/fr/formation/sorienter" },
      { label: "Licences", href: "https://formations.unistra.fr/fr/formations/licence-LIG.html" },
      { label: "Masters", href: "https://formations.unistra.fr/fr/formations/master-MAS.html" },
      { label: "Doctorat", href: "https://doctorat.unistra.fr/fr/recherche/doctorat" },
      { label: "Formation continue", href: "https://www.unistra.fr/fr/formation/continuer-se-former" },
      { label: "Toutes les formations", href: "https://formations.unistra.fr/" },
    ],
  },
  {
    label: "Recherche",
    href: "https://www.unistra.fr/fr/recherche",
    children: [
      { label: "Laboratoires et équipes", href: "https://www.unistra.fr/fr/recherche/les-unites-de-recherche" },
      { label: "Doctorat & HDR", href: "https://doctorat.unistra.fr/" },
      { label: "Transfert & valorisation", href: "https://www.unistra.fr/fr/recherche/transfert-de-technologies" },
      { label: "Actualités recherche", href: "https://www.unistra.fr/fr/actualites/recherche" },
    ],
  },
  {
    label: "International",
    href: "https://www.unistra.fr/fr/international",
    children: [
      { label: "Partir en échange", href: "https://www.unistra.fr/fr/international/partir-letranger" },
      { label: "Venir à Strasbourg", href: "https://www.unistra.fr/fr/international/venir-en-france" },
      { label: "Alliance européenne EPICUR", href: "https://www.unistra.fr/fr/international/epicur" },
    ],
  },
  {
    label: "Vie universitaire",
    href: "https://www.unistra.fr/fr/vie-universitaire",
    children: [
      { label: "Vie étudiante", href: "https://www.unistra.fr/fr/vie-universitaire/vie-etudiante" },
      { label: "Bibliothèques", href: "https://www.unistra.fr/fr/vie-universitaire/bibliotheques" },
      { label: "Sport & culture", href: "https://www.unistra.fr/fr/vie-universitaire/sport-culture" },
      { label: "Santé & handicap", href: "https://www.unistra.fr/fr/vie-universitaire/sante-handicap" },
    ],
  },
  {
    label: "Université",
    href: "https://www.unistra.fr/fr/universite",
    children: [
      { label: "Gouvernance", href: "https://www.unistra.fr/fr/universite/gouvernance" },
      { label: "Facultés, écoles, instituts", href: "https://www.unistra.fr/fr/entites" },
      { label: "Chiffres clés", href: "https://www.unistra.fr/fr/universite/decouvrir/chiffres-cles" },
      { label: "Recrutement", href: "https://www.unistra.fr/les-offres-demploi" },
    ],
  },
];

const AUDIENCE_LINKS = [
  { label: "Lycéen·ne", href: "https://lyceen.unistra.fr/" },
  { label: "Étudiant·e", href: "https://bienvenue.unistra.fr/" },
  { label: "Doctorant·e", href: "https://doctorat.unistra.fr/" },
  { label: "Entreprise", href: "https://entreprises.unistra.fr/" },
  { label: "Alumni", href: "https://www.unistra.fr/fr/universite/partenaires/reseau-alumni" },
];

const HeaderStrasbourg = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const primary = runtimeConfig.primaryColor;
  const secondary = runtimeConfig.secondaryColor;

  return (
    <header style={{ fontFamily: "Arial, Helvetica, sans-serif", borderBottom: "3px solid " + primary }}>
      {/* ── Top utility bar ── */}
      <div style={{ backgroundColor: primary, color: "#fff", fontSize: "13px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "6px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          <nav aria-label="Public navigation" style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            {AUDIENCE_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", textDecoration: "none", opacity: 0.9, fontSize: "12px" }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <a
              href="https://www.unistra.fr/fr/contact"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", textDecoration: "none", fontSize: "12px", opacity: 0.9 }}
            >
              Contact
            </a>
            <a
              href="https://www.unistra.fr/fr/agenda"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", textDecoration: "none", fontSize: "12px", opacity: 0.9 }}
            >
              Agenda
            </a>
            <a
              href="https://www.unistra.fr/fr/faq"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", textDecoration: "none", fontSize: "12px", opacity: 0.9 }}
            >
              FAQ
            </a>
          </div>
        </div>
      </div>

      {/* ── Logo bar ── */}
      <div style={{ backgroundColor: "#fff", padding: "10px 0", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a href="https://www.unistra.fr/" target="_blank" rel="noopener noreferrer">
            <BrandLogo
              alt={runtimeConfig.universityName}
              style={{ height: "58px", width: "auto" }}
            />
          </a>

          {/* Search + mobile toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="https://www.unistra.fr/fr/rechercher"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rechercher"
              style={{ color: primary, display: "flex", alignItems: "center" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
              </svg>
            </a>
            <button
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: primary,
                padding: "4px",
              }}
              className="unistra-hamburger"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                {mobileOpen
                  ? <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  : <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main navigation ── */}
      <nav
        aria-label="Navigation principale"
        style={{
          backgroundColor: "#fff",
          borderTop: "1px solid #e8ecf0",
          display: mobileOpen ? "block" : undefined,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              margin: 0,
              padding: 0,
              gap: 0,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                style={{ position: "relative" }}
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    padding: "14px 18px",
                    color: openMenu === item.label ? primary : "#333",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    borderBottom: openMenu === item.label ? "3px solid " + primary : "3px solid transparent",
                    whiteSpace: "nowrap",
                    transition: "color 0.15s, border-color 0.15s",
                  }}
                >
                  {item.label}
                </a>
                {/* Dropdown */}
                {item.children && openMenu === item.label && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      backgroundColor: "#fff",
                      border: "1px solid #e0e4ea",
                      borderTop: "3px solid " + primary,
                      listStyle: "none",
                      margin: 0,
                      padding: "8px 0",
                      minWidth: "220px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                      zIndex: 1000,
                    }}
                  >
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "block",
                            padding: "9px 20px",
                            color: "#333",
                            textDecoration: "none",
                            fontSize: "13px",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f0f3f8";
                            e.currentTarget.style.color = primary;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#333";
                          }}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Responsive helper */}
      <style>{`
        @media (max-width: 768px) {
          .unistra-hamburger { display: block !important; }
          nav[aria-label="Navigation principale"] { display: none; }
          nav[aria-label="Navigation principale"][style*="block"] { display: block !important; }
          nav[aria-label="Navigation principale"] ul { flex-direction: column; }
          nav[aria-label="Navigation principale"] ul ul {
            position: static !important;
            box-shadow: none !important;
            border: none !important;
            padding-left: 16px;
          }
        }
      `}</style>
    </header>
  );
};

export default HeaderStrasbourg;

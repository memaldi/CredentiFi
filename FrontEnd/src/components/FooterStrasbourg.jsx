import React from "react";

const UNISTRA_RED = "#C8002B";

const footerColumns = [
  {
    title: "Formation",
    links: [
      { label: "S'orienter", href: "https://www.unistra.fr/fr/formation/sorienter" },
      { label: "Choisir sa formation", href: "https://formations.unistra.fr" },
      { label: "Candidater", href: "https://www.unistra.fr/fr/formation/admission/candidater" },
      { label: "Calendrier universitaire", href: "https://www.unistra.fr/fr/formation/admission/calendrier-universitaire" },
      { label: "Réussir à l'université", href: "https://www.unistra.fr/fr/formation/reussir-luniversite" },
    ],
  },
  {
    title: "Vie de campus",
    links: [
      { label: "Carte des campus", href: "https://www.unistra.fr/fr/carte" },
      { label: "Bibliothèques", href: "https://www.unistra.fr/fr/campus/bibliotheques" },
      { label: "Culture & sport", href: "https://www.unistra.fr/fr/campus/culture-et-sport" },
      { label: "Santé & bien-être", href: "https://www.unistra.fr/fr/campus/sante-et-bien-etre" },
      { label: "Logement", href: "https://www.unistra.fr/fr/campus/logement" },
    ],
  },
  {
    title: "Recherche",
    links: [
      { label: "Les laboratoires", href: "https://www.unistra.fr/fr/recherche/nos-laboratoires" },
      { label: "Valorisation", href: "https://www.unistra.fr/fr/recherche/valorisation" },
      { label: "Doctorat", href: "https://doctorat.unistra.fr" },
      { label: "Actualités recherche", href: "https://www.unistra.fr/fr/actualites/recherche" },
    ],
  },
  {
    title: "L'université",
    links: [
      { label: "Découvrir l'université", href: "https://www.unistra.fr/fr/universite/decouvrir" },
      { label: "Gouvernance", href: "https://www.unistra.fr/fr/universite/gouvernance" },
      { label: "Offres d'emploi", href: "https://www.unistra.fr/les-offres-demploi" },
      { label: "Presse & médias", href: "https://www.unistra.fr/fr/universite/presse-et-medias" },
      { label: "Contact", href: "https://www.unistra.fr/fr/contact" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/unistra",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/unistra",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@unistra",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/school/université-de-strasbourg",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

const FooterStrasbourg = () => {
  return (
    <footer style={{ fontFamily: "'Source Sans Pro', Arial, sans-serif", backgroundColor: "#1A1A1A", color: "white", marginTop: "48px" }}>
      {/* ── Top footer band with red accent ── */}
      <div style={{ backgroundColor: UNISTRA_RED, padding: "24px 0" }}>
        <div style={{ maxWidth: "1260px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ margin: 0, color: "white", fontSize: "16px", fontWeight: "600", lineHeight: "1.4" }}>
            L'Université de Strasbourg est une université européenne<br />de service public, engagée pour la réussite en formation et en recherche.
          </p>
          {/* Social icons */}
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ color: "white", opacity: 0.85, display: "flex", alignItems: "center" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "1"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "0.85"; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Link columns ── */}
      <div style={{ maxWidth: "1260px", margin: "0 auto", padding: "40px 24px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px" }}>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h3 style={{ color: "white", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px", marginTop: 0, borderBottom: `2px solid ${UNISTRA_RED}`, paddingBottom: "8px" }}>
              {col.title}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {col.links.map((link) => (
                <li key={link.label} style={{ marginBottom: "8px" }}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#C8C8C8", textDecoration: "none", fontSize: "14px" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#C8C8C8"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom legal bar ── */}
      <div style={{ borderTop: "1px solid #333", padding: "16px 24px" }}>
        <div style={{ maxWidth: "1260px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#888", fontSize: "12px" }}>© {new Date().getFullYear()} Université de Strasbourg</span>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {[
              { label: "Plan du site", href: "https://www.unistra.fr/fr/sitemap" },
              { label: "Protection des données", href: "https://www.unistra.fr/fr/protection-des-donnees" },
              { label: "Accessibilité", href: "https://www.unistra.fr/fr/politique-daccessibilite" },
              { label: "Mentions légales", href: "https://www.unistra.fr/fr/credits-et-mentions-legales" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#888", textDecoration: "none", fontSize: "12px" }}
                onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#888"; }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterStrasbourg;

const DEFAULT_GOOGLE_CLIENT_ID = "148984854097-755k3hrbn4ui4tfge52h964qgne1s8oa.apps.googleusercontent.com";

const stripTrailingSlash = (value) => value.replace(/\/$/, "");
const normalizeOptionalValue = (value) => {
  if (!value) {
    return "";
  }

  return value.startsWith("REPLACE_WITH_") ? "" : value;
};
const normalizeOptionalAsset = (value, fallback) => {
  if (value === undefined) {
    return fallback;
  }

  return value === "none" ? "" : value;
};

const apiBaseUrl = stripTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
);

const runtimeConfig = {
  tenant: import.meta.env.VITE_TENANT || "deusto",
  universityName:
    import.meta.env.VITE_UNIVERSITY_NAME || "Universidad de Deusto",
  allowedEmailDomain:
    import.meta.env.VITE_ALLOWED_EMAIL_DOMAIN || "opendeusto.es",
  googleClientId:
    normalizeOptionalValue(import.meta.env.VITE_GOOGLE_CLIENT_ID) ||
    DEFAULT_GOOGLE_CLIENT_ID,
  logoUrl: normalizeOptionalAsset(
    import.meta.env.VITE_LOGO_URL,
    "/branding/deusto/logo.png"
  ),
  logoInverseUrl: normalizeOptionalAsset(
    import.meta.env.VITE_LOGO_INVERSE_URL,
    "/branding/deusto/logo-white.png"
  ),
  primaryColor: import.meta.env.VITE_PRIMARY_COLOR || "#0153ce",
  secondaryColor: import.meta.env.VITE_SECONDARY_COLOR || "#13448d",
  apiBaseUrl,
};

const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${runtimeConfig.apiBaseUrl}${normalizedPath}`;
};

export { apiUrl, runtimeConfig };
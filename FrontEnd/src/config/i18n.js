import { runtimeConfig } from "./runtime";

const isFr = runtimeConfig.tenant === "strasbourg";

/**
 * Returns `es` for Deusto or `fr` for Strasbourg.
 * Usage:  t("Solicitar", "Demander")
 */
export const t = (es, fr) => (isFr ? fr : es);

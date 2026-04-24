import { runtimeConfig } from "./runtime";

const isFr = runtimeConfig.tenant === "lumiere";

/**
 * Returns `es` for Deusto or `fr` for Lumiere.
 * Usage:  t("Solicitar", "Demander")
 */
export const t = (es, fr) => (isFr ? fr : es);

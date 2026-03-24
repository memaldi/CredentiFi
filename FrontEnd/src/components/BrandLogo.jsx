import React from "react";
import { runtimeConfig } from "../config/runtime";

function BrandLogo({
  alt,
  className,
  style,
  inverse = false,
  fallbackClassName,
}) {
  const src = inverse
    ? runtimeConfig.logoInverseUrl || runtimeConfig.logoUrl
    : runtimeConfig.logoUrl || runtimeConfig.logoInverseUrl;

  if (src) {
    return (
      <img
        src={src}
        alt={alt || runtimeConfig.universityName}
        className={className}
        style={style}
      />
    );
  }

  return (
    <span className={fallbackClassName || className} style={style}>
      {runtimeConfig.universityName}
    </span>
  );
}

export default BrandLogo;
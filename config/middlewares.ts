import type { Core } from "@strapi/strapi";

const S3_CDN = process.env.S3_CDN || "https://media.platoblog.com";
const S3_BUCKET = process.env.S3_BUCKET || "platobox-cms-media";
const S3_REGION = process.env.S3_REGION || "eu-central-1";

const config: Core.Config.Middlewares = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            `${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`,
            S3_CDN,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            `${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`,
            S3_CDN,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

export default config;

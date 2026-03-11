import type { Core } from "@strapi/strapi";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        baseUrl: env("S3_CDN", "https://media.platoblog.com"),
        s3Options: {
          credentials: {
            accessKeyId: env("S3_ACCESS_KEY_ID"),
            secretAccessKey: env("S3_ACCESS_SECRET"),
          },
          region: env("S3_REGION", "eu-central-1"),
          params: {
            ACL: env("S3_ACL", "public-read"),
            signedUrlExpires: env("S3_SIGNED_URL_EXPIRES", 15 * 60),
            Bucket: env("S3_BUCKET", "platobox-cms-media"),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});

export default config;

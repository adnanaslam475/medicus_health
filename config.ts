const config = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  version: process.env.NEXT_PUBLIC_VERSION,
  stripeKey: process.env.NEXT_PUBLIC_STRIPE,
  region:process.env.NEXT_PUBLIC_AWS_REGION,
  bucketName:process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  accessKeyId:process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secertAccessKey:process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  agoraAppId:process.env.NEXT_PUBLIC_AGORA_APP_ID,
};
export default config;

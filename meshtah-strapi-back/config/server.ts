export default ({ env }) => ({
  url: env('PUBLIC_URL', 'https://meshtah.net'),
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  proxy: true,  // ← This is critical!
  app: {
    keys: env.array('APP_KEYS'),
  },
});
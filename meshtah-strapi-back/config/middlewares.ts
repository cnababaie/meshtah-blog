export default [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::security',
    config: {
      cookie: {
        'strapi-admin': {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          domain: 'meshtah.net',
          path: '/',
        },
      },
    },
  }
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

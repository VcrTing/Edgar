module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '22eda536f9c1e192ddcdde0da6724a57'),
    },
  },
  cron: {
    enabled: env.bool('CRON_ENABLED', true),
  }
});

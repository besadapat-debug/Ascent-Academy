// Android + iOS app settings. The address comes from app.config.json (one place to change it).
const cfg = require('./app.config.json');
const host = new URL(cfg.url).host;
module.exports = {
  appId: cfg.appId,
  appName: cfg.name,
  webDir: 'www',
  server: { url: cfg.url, androidScheme: 'https', cleartext: false, allowNavigation: [host, '*.supabase.co'] },
  ios: { contentInsetAdjustmentBehavior: 'always' },
  android: { allowMixedContent: false }
};

Package.describe({
  name: 'helium:flickr',
  version: '1.0.0',
  summary: 'Flickr OAuth flow',
  git: 'https://github.com/meteor-helium/flickr.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.0.2");

  api.use('http', ['client', 'server']);
  api.use('templating', 'client');
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('random', 'client');
  api.use('underscore', 'server');
  api.use('service-configuration', ['client', 'server']);

  api.export('Flickr');

  api.addFiles(
    ['flickr_configure.html', 'flickr_configure.js'],
    'client');

  api.addFiles('flickr_server.js', 'server');
  api.addFiles('flickr_client.js', 'client');
});

Flickr = {};

var urls = {
  requestToken: "https://www.flickr.com/services/oauth/request_token",
  authorize: "https://www.flickr.com/services/oauth/authorize",
  accessToken: "https://www.flickr.com/services/oauth/access_token",
  authenticate: "https://www.flickr.com/services/oauth/authorize"
};

Flickr.whitelistedFields = ['user', 'id', 'username'];

OAuth.registerService('flickr', 1, urls, function(oauthBinding) {
  var identity = oauthBinding.get('https://api.flickr.com/services/rest?nojsoncallback=1&format=json&method=flickr.test.login').data;

  var serviceData = {
    id: identity.user.id,
    username: identity.user.username._content,
    accessToken: OAuth.sealSecret(oauthBinding.accessToken),
    accessTokenSecret: OAuth.sealSecret(oauthBinding.accessTokenSecret)
  };

  var fields = _.pick(identity, Flickr.whitelistedFields);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {
      profile: {
        name: identity.user.username._content
      }
    }
  };
});


Flickr.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};

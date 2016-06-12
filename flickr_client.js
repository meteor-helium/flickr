Flickr = {};

// Request Flickr credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Flickr.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'flickr'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();

  var loginStyle = OAuth._loginStyle('flickr', config, options);

  var loginPath = '_oauth/flickr/?requestTokenAndRedirect=true'
        + '&state=' + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl);

  if (Meteor.isCordova) {
    loginPath = loginPath + "&cordova=true";
    if (/Android/i.test(navigator.userAgent)) {
      loginPath = loginPath + "&android=true";
    }
  }

  // Handle force login (request the user to enter their credentials)
  if (options.force_login) {
    loginPath += "&force_login=true";
  }

  var loginUrl = Meteor.absoluteUrl(loginPath);

  OAuth.launchLogin({
    loginService: "flickr",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken
  });
};

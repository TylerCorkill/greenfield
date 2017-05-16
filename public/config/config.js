angular.module('app', ['auth0.lock', 'angular-jwt', 'ui.router', 'ngMap'])
  .config(function($sceDelegateProvider, lockProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://maps.googleapis.com/maps/**'
    ]);

    lockProvider.init({
      clientID: process.env.AUTH0_ID,
      domain: process.env.AUTH0_DOMAIN,
      options: {
        _idTokenVerification: false
      }
    });



  });

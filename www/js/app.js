// Ionic Starter App
var debug = true; // TODO set 

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives'])

.constant("dics", window.dictionaries)
.constant("events", window.application.events)
.run(function($ionicPlatform, $rootScope, events) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      
      fireReady($rootScope, events.ready);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    if(debug && !window.cordova) {
      fireReady($rootScope, events.ready);
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    .state('app.solver', {
    url: '/solver',
      views: {
        'menuContent': {
          templateUrl: 'templates/solver.html',
          controller : 'SolverCtrl'
        }
      }
  })

  .state('app.main', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller : 'HomeCtrl'
      }
    }
  })

  .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html'
        }
      }
  //   })
  //   .state('app.playlists', {
  //     url: '/playlists',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/playlists.html',
  //         controller: 'PlaylistsCtrl'
  //       }
  //     }
  //   })
  //
  // .state('app.single', {
  //   url: '/playlists/:playlistId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

angular.module('starter.directives', []);
angular.module('starter.services', ['ionic']);
angular.module('starter.controllers', ['starter.services']);

function fireReady($rootScope, eventName) {
  console.log("[+] Firing event ready " + eventName);
  $rootScope.$broadcast(eventName);
  $rootScope[eventName] = true;
}

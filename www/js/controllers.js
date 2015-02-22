angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})


.controller('TestCtrl', function($scope, $timeout, $cordovaBackgroundGeolocation, $ionicPlatform, $window)
{
  $scope.lat_geo = "loading lat...";
  $scope.long_geo = "loading long...";


  //-- Geolocal launch
  var options = {
    enableHighAccuracy : false,
    desiredAccuracy: 0,
    stationaryRadius: 1,
    distanceFilter: 5,
    notificationTitle: 'Background tracking', // <-- android only, customize the title of the notification
    notificationText: 'ENABLED', // <-- android only, customize the text of the notification
    activityType: 'AutomotiveNavigation',
    debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
  };

  
  $ionicPlatform.ready(function()
  {
  // document.addEventListener("deviceready", function ()
  // {
    console.log("[IONIC PLATFORM IS NOW READY]");

    //-- First launch a basic geolocalisation to get user acceptance of geosharing ;)
    navigator.geolocation.getCurrentPosition(function(location) {
        console.log('[GEOLOCAL JS1] Location from Phonegap');
    },
    function (error){
        console.log('[GEOLOCAL JS1] error with GPS: error.code: ' + error.code + ' Message: ' + error.message);
    },options);

    // // `configure` calls `start` internally
    // $cordovaBackgroundGeolocation.configure(options)
    // .then(
    //   null, // Background never resolves
    //   function (err) { // error callback
    //     console.error("[GEOLOCAL JS2] Error: "+err);
    //   },
    //   function (location) { // notify callback each time it updates
    //     console.log("[GEOLOCAL JS2] Location update: "+location);
    //   });
    //   // $scope.stopBackgroundGeolocation = function () {
    //   // $cordovaBackgroundGeolocation.stop();
    //   // };


    //-- test adaptation depuis l'app jquery
    var callbackFn = function(location) {
        console.log('[BackgroundGeoLocation] Update callback:  ' + location.latitude + ',' + location.longitude);
    };

    var failureFn = function(error) {
        console.log('[BackgroundGeoLocation] Error: '+error);
    };

    // Only ios emits this stationary event
    // $cordovaBackgroundGeolocation.onStationary(function(location)
    // {
    //    console.log("[BackgroundGeoLocation] I think that you are not moving :)");
    // });

    // BackgroundGeoLocation is highly configurable.
    $cordovaBackgroundGeolocation.configure(callbackFn, failureFn, {
        // url: 'http://only.for.android.com/update_location.json', // <-- Android ONLY:  your server url to send locations to
        // params: {
        //     auth_token: 'user_secret_auth_token',    //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
        //     foo: 'bar'                              //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
        // },
        desiredAccuracy: 0,
        stationaryRadius: 1,
        distanceFilter: 5,
        notificationTitle: 'Background tracking', // <-- android only, customize the title of the notification
        notificationText: 'ENABLED', // <-- android only, customize the text of the notification
        activityType: 'AutomotiveNavigation',
        debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
    });

    // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
    $cordovaBackgroundGeolocation.start();



    //-- Just a timeout to retreive long / lat
    $timeout(function()
    {
      navigator.geolocation.getCurrentPosition(function(location)
      {
        console.log('[GEOLOCAL JS3] Location from Phonegap');
        startPos = location;
        $scope.$apply(function () {
          $scope.lat_geo = startPos.coords.latitude;
          $scope.long_geo = startPos.coords.longitude;
        });
        console.log("[GEOLOCAL BASIC] OK this time :)");
      },
      function (error){
        console.log('[GEOLOCAL JS3] error with GPS: error.code: ' + error.code + ' Message: ' + error.message);
      },options);
    }, 3000);



  // }, false);
  });
  //-- End Geolocal





})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

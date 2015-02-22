# ionic_ngcordova_backgroundgeo_test

Test app to log every geolocation updates while in background task

Using:
http://ionicframework.com/
http://ngcordova.com/docs/plugins/backgroundGeolocation/

<b>Cmd used:</b>

mkdir geo_adapt

cd geo_adapt/

ionic start myApp sidemenu

cd myApp/

bower install ngCordova

cordova plugin add https://github.com/christocracy/cordova-plugin-background-geolocation.git

ionic platform add ios

ionic build ios


index.html > add ngCordova files
```
<!-- ngCordova -->
<script src="lib/ngCordova/dist/ng-cordova.js"></script>
```

app.js > new state « test »
```
  .state('app.test', {
    url: "/test",
    views: {
      'menuContent': {
        templateUrl: "templates/test.html"
      }
    }
  })
```

also changing default route to our controller for more ease
```
$urlRouterProvider.otherwise('/app/test');
```

adding ngCordova in module
```
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])
```

controllers.js > add test
```
.controller('TestCtrl', function($scope) {
  $scope.lat_geo = "test ok";
})
```

test.html > show long / lat
```
<ion-view view-title="Search">
  <ion-content ng-controller="TestCtrl">
    <p>{{lat_geo}}</p>
    <p>{{long_geo}}</p>
  </ion-content>
</ion-view>
```

menu.html > add test menu link
```
<ion-item nav-clear menu-close href="#/app/search">
Test geolocal
</ion-item>
```

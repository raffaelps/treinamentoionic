// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

    .run(function ($ionicPlatform, $cordovaPush) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);

                var iosConfig = {
                    "badge": true,
                    "sound": true,
                    "alert": true,
                };

                $cordovaPush.register(iosConfig).then(function (deviceToken) {
                    console.log("deviceToken: " + deviceToken);
                }, function (err) {
                    alert("Registration error: " + err)
                });

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

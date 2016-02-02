angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $cordovaCamera) {
        
        $scope.tirarFoto = function() {

                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    saveToPhotoAlbum: false
                };
   
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.foto = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                });
        }
        
        $scope.escolherFoto = function() {

                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    saveToPhotoAlbum: false
                };
   
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.foto = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                });
        }

    });
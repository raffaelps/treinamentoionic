angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    
    $scope.localizacao = {
        lat: "",
        lon: ""
    }
    
    navigator.geolocation.getCurrentPosition(function (position){
        $scope.localizacao.lat = position.coords.latitude
        $scope.localizacao.lon = position.coords.longitude
    }, function (error) {
    });
})

.controller('ChatsCtrl', function($scope, Chats) {
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  
})

.controller('AccountCtrl', function($scope) {
  
});

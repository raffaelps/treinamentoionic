var urlBase = 'https://padariatijuquinha.herokuapp.com';

angular.module('starter.services', [])

.factory('Produtos', function($http, $q, $filter) {
    
    var listaProdutos = undefined;
    
    function getProdutos() {
        return $http.get(urlBase + '/api/produtos');
    }
    
    function all() {
        
        var q = $q.defer();
        
        if (listaProdutos) {
            q.resolve(listaProdutos);
        }
        else {
            getProdutos().then(function (data) {
                q.resolve(data.data);
                listaProdutos = data.data;
            }, function (error) {
                q.reject(error);
            });
        }
        
        return q.promise;
    }
    
    function reload() {
        
        var q = $q.defer();
        
        getProdutos().then(function (data) {
            q.resolve(data.data);
            listaProdutos = data.data;
        }, function (error) {
            q.reject(error);
        });
            
        return q.promise;
    }
    
    function get(idProduto) {
        return $filter('filter')(listaProdutos, { _id: idProduto })[0];
    }
    
    return {
        all: all,
        reload: reload,
        get: get
    };
    
})

.factory('Pedidos', function($http, $q, $filter) {
    
    function add(pedido) {
        
        var q = $q.defer();
        
        $http.post(urlBase + '/api/pedidos', pedido).then(function (data) {
            q.resolve(data.data);
        }, function (error) {
            q.reject(error);
        });
        
        return q.promise;
    }
    
    function all(idUsuario) {
        
        var q = $q.defer();
        
        $http.get(urlBase + '/api/pedidos/' + idUsuario).then(function (data) {
            q.resolve(data.data);
        }, function (error) {
            q.reject(error);
        });
        
        return q.promise;
    }
    
    return {
        add: add,
        all: all
    }
    
})

.factory('Usuario', function($http, $q, $filter) {
    
    var usuarioLogado = undefined;
    
    function add(usuario) {
        var q = $q.defer();
        
        $http.post(urlBase + '/api/usuario', usuario).then(function (data) {
            q.resolve(data.data);
            usuarioLogado = data.data;
        }, function (error) {
            q.reject(error);
        });
        
        return q.promise;
    }
    
    function login(usuario) {
        var q = $q.defer();
        
        $http.get(urlBase + '/api/usuario/' + usuario.usuario + '/' + usuario.senha).then(function (data) {
            q.resolve(data.data);
            usuarioLogado = data.data;
        }, function (error) {
            q.reject(error);
        });
        
        return q.promise;
    }
    
    function get() {
        return usuarioLogado;
    }
    
    function logoff() {
        usuarioLogado = undefined;
    }
    
    return {
        add: add,
        login: login,
        get: get,
        logoff: logoff
    }
    
})

.factory('Localizacao', function ($http, $q, $filter) {

    var localizacao = {
        lat: 0,
        lon: 0
    }
    
    function get() {
        
        var q = $q.defer();
        navigator.geolocation.getCurrentPosition(function (position){
            localizacao.lat = position.coords.latitude
            localizacao.lon = position.coords.longitude
            console.log(localizacao);
            q.resolve(localizacao);
        }, function (error) {
            q.resolve(localizacao);
        });
        
        return q.promise;
    }
    
    return {
        get: get
    }
});
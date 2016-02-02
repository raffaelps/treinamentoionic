angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, Usuario, $ionicPopup) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        
        $scope.usuarioLogado = undefined;

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };
        
        $scope.logoff = function () {
            Usuario.logoff();
            $scope.usuarioLogado = undefined;
        };
        
        $scope.criarUsuario = function () {
            Usuario.add($scope.loginData).then(function (data) {
                $ionicPopup.alert({
                    title: 'Padaria Tijuquinha',
                    template: 'Usuário criado com sucesso.'
                });
            }, function (error) {
                $ionicPopup.alert({
                    title: 'Padaria Tijuquinha',
                    template: 'Erro ao criar usuário.'
                });
            });
        }

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            
            Usuario.login($scope.loginData).then(function (data) {
                $scope.usuarioLogado = data;
                $scope.closeLogin();
            }, function (error) {
                $ionicPopup.alert({
                    title: 'Padaria Tijuquinha',
                    template: 'Erro ao realizar login.'
                });
            });
        };
    })

    .controller('ProdutosCtrl', function ($scope, Produtos, $ionicPopup, $ionicLoading) {
        
        $ionicLoading.show({
            template: 'Carregando produtos'
        });
        Produtos.all().then(function (data) {
            $scope.produtos = data;
            $ionicLoading.hide();
        }, function (error) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Padaria Tijuquinha',
                template: 'Erro ao recuperar lista de produtos.'
            });
        });
        
        $scope.recarregarListaProdutos = function () {
            $ionicLoading.show({
                template: 'Carregando produtos'
            });
            Produtos.reload().then(function (data) {
                $scope.produtos = data;
                $ionicLoading.hide();
            }, function (error) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Padaria Tijuquinha',
                    template: 'Erro ao recuperar lista de produtos.'
                });
            });
        }
    })

    .controller('ProdutoCtrl', function ($scope, $stateParams, Produtos, Usuario, Pedidos, $ionicPopup, Localizacao, $ionicHistory, $ionicLoading) {
        $scope.produto = Produtos.get($stateParams.idProduto);
        $scope.pedido = {
            quantidadePedido: "1"
        };
        $scope.usuarioLogado = Usuario.get();
        
        function recuperarLocalizacaoUsuario() {
            Localizacao.get().then(function (loc) {
                fazerPedido(loc);   
            });
        }
        
        function fazerPedido(localizacao) {
            
            $ionicLoading.show({
                template: 'Fazendo pedido.'
            });
            
            var pedido = {
                quantidade: $scope.pedido.quantidadePedido,
                idUsuario: $scope.usuarioLogado._id,
                idProduto: $scope.produto._id,
                data: new Date().getTime(),
                localizacao: localizacao
            }
            
            Pedidos.add(pedido).then(function (data) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Padaria Tijuquinha',
                    template: 'Pedido solicitado com sucesso.'
                });
                $ionicHistory.goBack();
                
            }, function (error) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Padaria Tijuquinha',
                    template: 'Erro ao solicitar pedido.'
                });
            });
        }
        
        $scope.fazerPedido = function () {
            recuperarLocalizacaoUsuario();
        }
    })
    
    .controller('PedidosCtrl', function ($scope, $stateParams, Usuario, Pedidos, $ionicPopup, $ionicLoading) {

        function recuperarPedidos() {
            $scope.usuarioLogado = Usuario.get();
            
            if ($scope.usuarioLogado != undefined) {
                $ionicLoading.show({
                    template: 'Carregando pedidos'
                });
                Pedidos.all($scope.usuarioLogado._id).then( function (data) {
                    $scope.pedidos = data;
                    $ionicLoading.hide();
                }, function (error) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Padaria Tijuquinha',
                        template: 'Erro ao recuperar pedidos.'
                    });
                });
            }
            else {
                $scope.pedidos = undefined;
            }
        }
        
        $scope.$on('$ionicView.enter', function(e) {
            recuperarPedidos();
        });
        
        $scope.recarregarListaPedidos = function () {
            recuperarPedidos();
        };

    });

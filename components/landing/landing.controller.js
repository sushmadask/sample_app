(function () {
    app.controller('LandingController', ['$scope', '$log', '$http', '$state','$uibModal', function ($scope, $log, $http, $state,$uibModal) {
        window.scrollTo(0, 0);
        $scope.popUp = {TYPE_INFO: 'info', TYPE_ALERT: 'alert', TYPE_CONFIRM: 'confirm', TYPE_ERROR: 'error'};

        $scope.popup = function(){
            $scope.open('md', $scope.popUp.TYPE_INFO);
        };

        $scope.gotoNext = function(){
            $state.go(app.state.NEXT);
        };
        $scope.open = function (size, template) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'shared/template/popup/' + template + '.html',
                controller: 'LandingInstanceCtrl',
                size: size,
                scope: $scope
            });
        };
    }]);

    app.controller('LandingInstanceCtrl', function ($uibModalInstance, $scope, $state) {
        $scope.init = function(){
            $scope.items = ['h1','h2','h3'];
            $scope.description = false;
        }
        $scope.init();        
        
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.confirm = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showDescription = function(desc){
            $scope.description = true;
            $scope.title = desc;
        };

        $scope.hideDescription = function(){
            $scope.description = false;
        };
    });

})();
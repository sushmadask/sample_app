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
            $scope.rootnode = true;
            $scope.dial1 = false; 
            $scope.play = false;
            $scope.ivr = false;
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
            switch (desc) {
                case "rootnode": 
                $scope.rootnode = true;
                $scope.dial1 = false;  
                $scope.play = false;
                $scope.ivr = false;
                    
                    break;

                case "dial1" : $scope.dial1 = true;  $scope.rootnode = false;  $scope.play = false; $scope.ivr = false; break;
                case "play" : $scope.rootnode = false;
                $scope.dial1 = false;  $scope.ivr = false;
                $scope.play = true; break;
                case "ivr": $scope.ivr = true;
                $scope.dial1 = false;  $scope.rootnode = false;  $scope.play = false;break;
            
                default:
                    break;
            }
        };

        $scope.hideDescription = function(){
            $scope.description = false;
        };

        $(document).ready(function() {
            $(".file-tree").filetree();
        });
        
    });

})();
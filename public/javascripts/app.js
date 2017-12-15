angular.module('store',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.products = [];
    $scope.inventory = [];
    $scope.getAll = function() {
	return $http.get('/ordering').success(function(data){
		angular.copy(data, $scope.products);
	});
    };

    $scope.getAll();

    $scope.create = function(product) {
	console.log(product);
		return $http.post('/ordering', product).success(function(data){
			$scope.products.push(data);
		});
    };

    $scope.dovote = function() {
      console.log("In Dovote");
      angular.forEach($scope.products, function(value,key) {
        if(value.selected) {
          $scope.upvote(value);
          $scope.inventory.push(value);
        }
      });
    }

    $scope.upvote = function(product) {
      return $http.put('/ordering/' + product._id + '/order')
        .success(function(data){
          console.log("upvote worked");
          products.upvotes += 1;
        });
    };

    $scope.addProduct = function(){ 
	console.log($scope.formContent);
      var newObj = {Name:$scope.formContent,picture:$scope.formPic,price:$scope.formPrice,orders:0};
      console.log(newObj);
      $scope.create(newObj);
      $scope.formContent = '';
    }

    $scope.incrementUpvotes = function(product) {
      $scope.upvote(product);
    };

    $scope.delete = function(product) {
      console.log("Deleting Name "+product.Name+" ID "+product._id);
      $http.delete('/ordering/' + product._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);

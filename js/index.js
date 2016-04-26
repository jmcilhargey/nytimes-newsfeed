var app = angular.module("newsApp", ["ngAnimate"]);
// Create factory object to return data for use in controller
app.factory("newsfeed", ["$http", function($http) {
  return $http.get("")
  .success(function(data) {
    return data;
  })
  .error(function(err) {
    return err;
  })
}]);
// Set data to scope to display in the view
app.controller("NewsController",["$scope", "newsfeed", function($scope, newsfeed) {
  newsfeed.success(function(data) {
    $scope.frontpage = data;
  });
}]);
// Testing custom directive to insert template into view
app.directive("artInfo", function() {
  return {
    restrict: "E",
    template: '<a href="{{ story.url }}" target="_blank"><img class="photo" ng-src="{{ story.multimedia[4].url }}"><div class="date">{{ story.updated_date | dateFormat }}</div><div class="headline">{{ story.title }}</div></a><div class="brief">{{ story.abstract }}</div><div class="date"</div>'
  }
})
// Create filter to chop off end of date JSON entry so we can apply date method
app.filter("dateFormat", function dateFormat($filter) {
  return function(text) {
    var date = new Date(text.substring(0, text.length - 5));
    return $filter("date")(date, "EEE, MMM d, h:mm a")
  }
});
'use strict';

// Teachers controller
angular.module('teachers').controller('TeachersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Teachers',
  function ($scope, $stateParams, $location, Authentication, Teachers) {
    $scope.authentication = Authentication;

    // Create new Teacher
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'teacherForm');

        return false;
      }

      // Create new Teacher object
      var teacher = new Teachers({
        FirstName: this.FirstName,
        LastName: this.LastName,
        Department: this.Department,
        Position: this.Position,
        content: this.content
      });

      // Redirect after save
      teacher.$save(function (response) {
        $location.path('teachers/' + response._id);

        // Clear form fields
        $scope.FirstName = '';
        $scope.LastName = '';
        $scope.Department = '';
        $scope.Position = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Teacher
    $scope.remove = function (teacher) {
      if (teacher) {
        teacher.$remove();

        for (var i in $scope.teachers) {
          if ($scope.teachers[i] === teacher) {
            $scope.teachers.splice(i, 1);
          }
        }
      } else {
        $scope.teacher.$remove(function () {
          $location.path('teachers');
        });
      }
    };

    // Update existing Teacher
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'teacherForm');

        return false;
      }

      var teacher = $scope.teacher;

      teacher.$update(function () {
        $location.path('teachers/' + teacher._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Teachers
    $scope.find = function () {
      $scope.teachers = Teachers.query();
    };

    // Find existing Teacher
    $scope.findOne = function () {
      $scope.teacher = Teachers.get({
        teacherId: $stateParams.teacherId
      });
    };
  }
]);

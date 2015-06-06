'use strict';

describe('Controller: GitCtrl', function () {

  // load the controller's module
  beforeEach(module('mockupsApp'));

  var GitCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GitCtrl = $controller('GitCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

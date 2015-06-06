'use strict';

describe('Controller: BacklogCtrl', function () {

  // load the controller's module
  beforeEach(module('mockupsApp'));

  var BacklogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BacklogCtrl = $controller('BacklogCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: IssuesCtrl', function () {

  // load the controller's module
  beforeEach(module('mockupsApp'));

  var IssuesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IssuesCtrl = $controller('IssuesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

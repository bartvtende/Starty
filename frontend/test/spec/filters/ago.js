'use strict';

describe('Filter: Ago', function () {

  // load the filter's module
  beforeEach(module('startyApp'));

  // initialize a new instance of the filter before each test
  var Ago;
  beforeEach(inject(function ($filter) {
    Ago = $filter('Ago');
  }));

  it('should return the input prefixed with "Ago filter:"', function () {
    var text = 'angularjs';
    expect(Ago(text)).toBe('Ago filter: ' + text);
  });

});

'use strict';

/**
 * @ngdoc function
 * @name startyApp.services:ForgotPasswordData
 * @description
 * # ForgotPasswordData
 * Service of the startyApp
 */
angular.module('startyApp')
  .service('JoinOrganizationData', ['$http', 'urls', function($http, urls) {

    this.joinOrganization = function (data) {
      return $http.post(urls.API + '/organizations', data);
    };

  }]);

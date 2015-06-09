'use strict';

/**
 * @ngdoc function
 * @name startyApp.services:ForgotPasswordData
 * @description
 * # ForgotPasswordData
 * Service of the startyApp
 */
angular.module('startyApp')
    .service('ForgotPasswordData', ['$http', 'urls', function($http, urls) {

        this.forgotPassword = function (data) {
            return $http.post(urls.API + '/users/forgot-password', data);
        };

    }]);
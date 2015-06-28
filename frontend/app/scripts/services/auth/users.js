'use strict';

/**
 * @ngdoc function
 * @name startyApp.services:ForgotPasswordData
 * @description
 * # ForgotPasswordData
 * Service of the startyApp
 */
angular.module('startyApp')
    .service('UserData', ['$http', 'urls', function ($http, urls) {

        this.getUser = function () {
            return $http.get(urls.API + '/users');
        };

    }]);

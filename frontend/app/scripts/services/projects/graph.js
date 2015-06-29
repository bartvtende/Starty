'use strict';

/**
 * @ngdoc service
 * @name startyApp.Board
 * @description
 * # Board
 * Service in the startyApp.
 */
angular.module('startyApp')
    .service('GraphData', function ($http, urls) {

        this.getGraph = function (sprintId) {
            return $http.get(urls.API + '/graph/' + sprintId);
        };

    });

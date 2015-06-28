'use strict';

/**
 * @ngdoc service
 * @name startyApp.Board
 * @description
 * # Board
 * Service in the startyApp.
 */
angular.module('startyApp')
    .service('BoardData', function ($http, urls) {

        var url = urls.API + '/boards';

        this.allBoards = function (projectId) {
            return $http.get(url + '/' + projectId);
        };

        this.createSprint = function (sprint) {
            return $http.post(url + '/sprints', sprint);
        };

        this.createList = function (list) {
            return $http.post(url + '/lists', list);
        };

        this.editList = function (list) {
            return $http.put(url + '/lists', list);
        };

        this.createItem = function (item) {
            return $http.post(url + '/items', item);
        };

    });

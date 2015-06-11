'use strict';

/**
 * @ngdoc service
 * @name startyApp.Backlog
 * @description
 * # Backlog
 * Service in the startyApp.
 */
angular.module('startyApp')
  .service('BacklogData', function ($http, urls) {

    this.allBacklogItems = function () {
        return $http.get(urls.API + '/backlog-items');
    };

    this.getBacklogItem = function (projectId) {
        return $http.get(urls.API + '/backlog-items/' + projectId);
    };

    this.createBacklogItem = function(backlogItem) {
        return $http.post(urls.API + '/backlog-items', backlogItem);
    };

  });

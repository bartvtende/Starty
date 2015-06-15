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

    this.allBacklogItems = function (projectId) {
        return $http.get(urls.API + '/backlog-items/' + projectId);
    };

    this.getBacklogItem = function (projectId, id) {
        return $http.get(urls.API + '/backlog-items/' + projectId + '/' + id);
    };

    this.setBacklogItem = function (backlogItem) {
        return $http.put(urls.API + '/backlog-items', backlogItem);
    };

    this.createBacklogItem = function (backlogItem) {
        return $http.post(urls.API + '/backlog-items', backlogItem);
    };

    this.deleteBacklogItem = function (projectId, id) {
        return $http.delete(urls.API + '/backlog-items/' + projectId + '/' + id);
    };

  });

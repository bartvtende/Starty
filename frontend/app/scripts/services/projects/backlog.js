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

    var url = urls.API + '/items/backlog';

    this.allBacklogItems = function (projectId) {
        return $http.get(url + '/' + projectId);
    };

    this.getBacklogItem = function (projectId, id) {
        return $http.get(url + '/' + projectId + '/' + id);
    };

    this.setBacklogItem = function (backlogItem) {
        return $http.put(url + '/', backlogItem);
    };

    this.createBacklogItem = function (backlogItem) {
        return $http.post(url + '/', backlogItem);
    };

    this.deleteBacklogItem = function (projectId, id) {
        return $http.delete(url + '/' + projectId + '/' + id);
    };

  });

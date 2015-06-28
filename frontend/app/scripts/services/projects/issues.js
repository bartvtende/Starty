'use strict';

/**
 * @ngdoc service
 * @name startyApp.Backlog
 * @description
 * # Backlog
 * Service in the startyApp.
 */
angular.module('startyApp')
    .service('IssuesData', function ($http, urls) {

        var url = urls.API + '/items/issues';

        this.allIssues = function (projectId) {
            return $http.get(url + '/' + projectId);
        };

        this.getIssue = function (projectId, id) {
            return $http.get(url + '/' + projectId + '/' + id);
        };

        this.setIssue = function (issue) {
            return $http.put(url + '/', issue);
        };

        this.createIssue = function (issue) {
            return $http.post(url + '/', issue);
        };

        this.deleteIssue = function (projectId, id) {
            return $http.delete(url + '/' + projectId + '/' + id);
        };

    });

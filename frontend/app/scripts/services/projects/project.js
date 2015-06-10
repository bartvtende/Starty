'use strict';

/**
 * @ngdoc service
 * @name startyApp.Project
 * @description
 * # Project
 * Service in the startyApp.
 */
angular.module('startyApp')
  .service('ProjectData', function ($http, urls) {

    this.allProjects = function () {
        return $http.get(urls.API + '/projects');
    };

    this.getProject = function (projectId) {
        return $http.get(urls.API + '/projects/' + projectId);
    };

    this.createProject = function(project) {
        return $http.post(urls.API + '/projects', project);
    };

  });

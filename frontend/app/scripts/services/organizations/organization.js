'use strict';

/**
 * @ngdoc service
 * @name startyApp.Organization
 * @description
 * # Organization
 * Service in the startyApp.
 */
angular.module('startyApp')
    .service('OrganizationData', function ($http, urls) {

        this.getOrganization = function () {
            return $http.get(urls.API + '/organizations')
        };

        this.inviteMember = function (user) {
            return $http.post(urls.API + '/organizations/invite', user);
        };

    });

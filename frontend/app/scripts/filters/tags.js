'use strict';

/**
 * @ngdoc filter
 * @name startyApp.filter:Ago
 * @function
 * @description
 * # Ago
 * Filter in the startyApp.
 */
angular.module('startyApp')
    .filter('tags', ['$filter', '$sce', function ($filter, $sce) {
        return function (message) {
            if (!message) return message;

            var replacePattern = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;

            var replacedText = message.replace(replacePattern, '$1<a ui-sref="overview.backlog-detail({id: $2})"' + targetAttr + '>#$2</a>');

            return message
        };
    }]);
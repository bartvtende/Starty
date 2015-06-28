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
    .filter('ago', function () {
        return function (isodate) {
            return moment(isodate).fromNow();
        };
    }).directive('time',
    [
        '$timeout',
        '$filter',
        function ($timeout, $filter) {

            return function (scope, element, attrs) {
                var time = attrs.time;
                var intervalLength = 1000 * 10; // 10 seconds
                var filter = $filter('ago');
                var timeoutId;

                function updateTime() {
                    element.text(filter(time));
                }

                function updateLater() {
                    timeoutId = $timeout(function () {
                        updateTime();
                        updateLater();
                    }, intervalLength);
                }

                element.bind('$destroy', function () {
                    $timeout.cancel(timeoutId);
                });

                updateTime();
                updateLater();
            };

        }
    ]
)
    .filter('time', function () {
        return function (isodate) {
            var date = new Date(isodate);
            return date.toLocaleTimeString();
        };
    })
    .filter('minutes', function () {
        return function (minutes) {
            if (minutes > 60) {
                var hours = Math.floor(minutes / 60);
                var newminutes = minutes - (hours * 60);

                if (newminutes === 0) {
                    return hours + ' hours';
                } else {
                    return hours + ' hours and ' + newminutes + ' minutes';
                }
            } else {
                return minutes + ' minutes';
            }
        };
    });

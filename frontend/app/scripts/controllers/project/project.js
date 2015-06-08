'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('ProjectCtrl', function ($scope) {

    $scope.projects = [
        { id: 'testing-starty', name: 'Testing the Starty app', amountOfParticipants: 4, description: 'Bacon ipsum dolor amet corned beef prosciutto' },
        { id: 'trello', name: 'Using Trello', amountOfParticipants: 2, description: 'Turducken beef ribs kielbasa andouille beef fatback brisket' },
        { id: 'testy-test', name: 'Testy test', amountOfParticipants: 5, description: 'Meatloaf shoulder pork belly hamburger' },
        { id: 'hello', name: 'Hello this is a new project', amountOfParticipants: 0, description: 'Tail jowl strip steak shankle bacon cupim turkey' },
        { id: 'whoohoo', name: 'Whoohoo', amountOfParticipants: 5, description: 'Shank pancetta filet mignon corned beef bacon' },
        { id: 'hello', name: 'Hello this is a new project', amountOfParticipants: 0, description: 'Tail jowl strip steak shankle bacon cupim turkey' },
        { id: 'hello', name: 'Hello this is a new project', amountOfParticipants: 0, description: 'Tail jowl strip steak shankle bacon cupim turkey' },
        { id: 'hello', name: 'Hello this is a new project', amountOfParticipants: 0, description: 'Tail jowl strip steak shankle bacon cupim turkey' }
    ];

  });

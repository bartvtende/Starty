'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:MessageCtrl
 * @description
 * # MessageCtrl
 * Controller of the startyApp
 */
//var socket = io('http://localhost:1338');

angular.module('startyApp')
  .controller('MessageCtrl', function ($scope, MessageData, $mdToast) {

      $scope.selectedChat = 'Chatting with all';
      $scope.personId = '';

        $scope.$watch('$viewContentLoaded', function() {
            $scope.loadPersons();
        });

        $scope.loadPersons = function() {
            MessageData.getUsers()
                .success(function(users) {
                    $scope.persons = users.result;
                })
                .error(function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Something went wrong while fetching the users info!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                });
        };

      $scope.messages = [
        { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Dit is een test bericht!', time: '7 days ago'},
        { image: 'http://placehold.it/50x50', name: 'Jan-Bert', message: 'lulz dit is zo cool', time: '7 days ago'},
        { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Ik ben zo awesome', time: '7 days ago'},
        { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Wat een topper ben ik', time: '7 days ago'},
        { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Testie test!', time: '7 days ago'}
      ];


      $scope.changeChat = function(personId, name) {
        $scope.personId = personId;

        $scope.selectedChat = 'Chatting with ' + name;
      };

      $scope.addMessage = function(message) {
        // Push the message to the dummy array
        if (message != '' && message != null)
          $scope.messages.push({image: 'http://placehold.it/50x50', name: 'Bart', message: message, time: 'Nu!'});

        // Delete the message from the input field
        $scope.message = '';

        // Stop the form from submitting
        return false;
      };

  });


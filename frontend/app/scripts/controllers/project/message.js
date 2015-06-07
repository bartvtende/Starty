'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:MessageCtrl
 * @description
 * # MessageCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('MessageCtrl', function ($scope) {

      $scope.selectedChat = 'Chatting with all';

      $scope.messages = [
        { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Dit is een test bericht!', time: '7 days ago'},
        { image: 'http://placehold.it/50x50', name: 'Jan-Bert', message: 'lulz dit is zo cool', time: '7 days ago'},
        { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Ik ben zo awesome', time: '7 days ago'},
        { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Wat een topper ben ik', time: '7 days ago'},
        { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Testie test!', time: '7 days ago'}
      ];

      $scope.persons = [
        { image: 'http://placehold.it/50x50', name: 'Bart', active: true },
        { image: 'http://placehold.it/50x50', name: 'Jan-Bert', active: false },
        { image: 'http://placehold.it/50x50', name: 'Jerke', active: false },
        { image: 'http://placehold.it/50x50', name: 'Henderikus', active: false }
      ];

      $scope.changeChat = function(name) {
        if (name == 'all') {
          $scope.messages = [
            { image: 'http://placehold.it/50x50', name: 'Jan-Bert', message: 'Dit is een test bericht!', time: '7 days ago'},
            { image: 'http://placehold.it/50x50', name: 'Bart', message: 'lulz dit is zo cool', time: '7 days ago'},
            { image: 'http://placehold.it/50x50', name: 'Henderikus', message: 'Ik ben zo awesome', time: '7 days ago'},
            { image: 'http://placehold.it/50x50', name: 'Jerke', message: 'Wat een topper ben ik', time: '7 days ago'},
            { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Testie test!', time: '7 days ago'}
          ];
          console.log('Changing to channel: ' + name);
        } else {
          $scope.messages = [
            { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Dit is een test bericht!', time: '7 days ago'},
            { image: 'http://placehold.it/50x50', name: 'Jan-Bert', message: 'lulz dit is zo cool', time: '7 days ago'},
            { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Ik ben zo awesome', time: '7 days ago'},
            { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Wat een topper ben ik', time: '7 days ago'},
            { image: 'http://placehold.it/50x50', name: 'Bart', message: 'Testie test!', time: '7 days ago'}
          ];
          console.log('Changing to person: ' + name);
        }

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

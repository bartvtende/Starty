'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:MessageCtrl
 * @description
 * # MessageCtrl
 * Controller of the startyApp
 */
var socky = io.connect('http://localhost:1338', {'force new connection': true});
angular.module('startyApp')
  .controller('MessageCtrl', function ($scope, MessageData, $mdToast, ProjectData, $stateParams, $auth) {

        $scope.selectedChat = 'Chatting with all';
        $scope.personId = null;

        $scope.$watch('$viewContentLoaded', function() {
            $scope.loadProject();
            $scope.loadPersons();
            $scope.loadSockets();
        });

        $scope.loadProject = function() {
          $scope.$watch('project', function() {
            if ($scope.project != null)
              $scope.loadGlobalMessages($scope.project.id);
          });
        };

        $scope.loadGlobalMessages = function(projectId) {
            MessageData.getGlobal(projectId)
              .success(function(messages) {
                $scope.messages = messages.result;
              })
              .error(function() {
                $mdToast.show(
                  $mdToast.simple()
                    .content('Something went wrong while fetching the messages!')
                    .position('bottom left')
                    .hideDelay(3000)
                );
              });
        };

        $scope.loadUsersMessages = function(projectId, userId) {
          MessageData.getPerson(projectId, userId)
            .success(function(messages) {
              $scope.messages = messages.result;
            })
            .error(function() {
              $mdToast.show(
                $mdToast.simple()
                  .content('Something went wrong while fetching the messages!')
                  .position('bottom left')
                  .hideDelay(3000)
              );
            });
        };

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

        $scope.loadSockets = function() {
            //socky.join(2);
            socky.on('receive', function(msg) {
              console.log('receive: ' + msg);
              $scope.$apply(function() {
                $scope.messages.push({image: 'http://placehold.it/50x50', name: 'Bart', message: msg, time: 'Nu!'});
              });
            });
        };

        $scope.changeChat = function(personId, name) {
          $scope.personId = personId;

          if (personId == '') {
            $scope.loadGlobalMessages($scope.project.id);
          } else {
            $scope.loadUsersMessages($scope.project.id, personId);
          }

          $scope.selectedChat = 'Chatting with ' + name;
        };

        $scope.addMessage = function(message) {
          var userId = $auth.getPayload().sub;

          console.log(userId);
          // Push the message to the dummy array
          if (message != '' && message != null) {
            var jsonMessage = '{ "message": "' + message + '", "userId": ' + userId + ', "projectId": ' + $scope.project.id;

            if ($scope.personId != null && $scope.personId != '')
              jsonMessage += ', "receiverId"  : ' + $scope.personId;

            jsonMessage += ' }';

            console.log(jsonMessage);

            socky.emit('chat message', jsonMessage);
          }

          // Delete the message from the input field
          $scope.message = '';

          // Stop the form from submitting
          return false;
        };

  });



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
    .controller('MessageCtrl', function ($scope, MessageData, $mdToast, ProjectData, $stateParams, $auth, $sce) {

        $scope.selectedChat = 'Chatting with all';
        $scope.personId = null;
        $scope.allmessages = 0;

        $scope.$watch('$viewContentLoaded', function () {
            $scope.loadProject();
            $scope.$watch('messages', function () {
                if ($scope.persons != undefined) {
                    $scope.connectUsers();
                }
            });
        });

        $scope.checkTags = function(message) {
            if (!message) return message;

            var replacePattern = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;

            var replacedText = message.replace(replacePattern, '$1<a href="#/' + $scope.project.shortcode + '/backlog/$2" class="tag">#$2</a>');

            return $sce.trustAsHtml(replacedText);
        };

        $scope.connectUsers = function () {
            for (var i = 0; i < $scope.messages.length; i++) {
                for (var j = 0; j < $scope.users.length; j++) {
                    if ($scope.messages[i].senderId == $scope.users[j].id) {
                        $scope.messages[i].name = $scope.users[j].name;
                    }
                }
            }
        };

        $scope.loadProject = function () {
                $scope.$watchGroup(['project', 'user'], function (values) {
                if (values[0] != null && values[0].id != undefined && values[1] != null && values[1].id != undefined) {
                    var projectId = $scope.project.id;
                    var userId = $scope.user.id;
                    $scope.loadSockets(projectId, userId);
                    $scope.loadPersons(userId);
                    $scope.loadGlobalMessages(projectId);
                }
            });
        };

        $scope.loadGlobalMessages = function (projectId) {
            MessageData.getGlobal(projectId)
                .success(function (messages) {
                    $scope.messages = messages.result;
                    window.setTimeout(showNewest, 100);
                })
                .error(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Something went wrong while fetching the messages!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                });
        };

        $scope.loadUsersMessages = function (projectId, userId) {
            MessageData.getPerson(projectId, userId)
                .success(function (messages) {
                    $scope.messages = messages.result;
                    window.setTimeout(showNewest, 100);
                })
                .error(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Something went wrong while fetching the messages!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                });
        };

        $scope.loadPersons = function (userId) {
            MessageData.getUsers()
                .success(function (users) {
                    $scope.users = JSON.parse(JSON.stringify(users.result));
                    for (var i = 0; i < users.result.length; i++) {
                        if (users.result[i].id == userId)
                            delete users.result[i];
                    }
                    users.result = users.result.filter(function (n) {
                        return n != undefined
                    });
                    for (var i = 0; i < users.result.length; i++) {
                        users.result[i].messages = 0;
                    }
                    $scope.persons = users.result;
                })
                .error(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Something went wrong while fetching the users info!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                });
        };

        $scope.loadSockets = function (projectId, userId) {
            socky.emit('join', 'p:' + projectId);

            socky.on('receive', function (msg) {
                var name;
                for (var i = 0; i < $scope.users.length; i++) {
                    if ($scope.users[i].id == msg.senderId) {
                        name = $scope.users[i].name;
                    }
                }
                if (($scope.personId == msg.receiverId && msg.senderId == userId) || ($scope.personId == msg.senderId && msg.receiverId == userId) || ($scope.personId == null && msg.receiverId == null)) {
                    $scope.$apply(function () {
                        $scope.messages.push({
                            image: 'http://placehold.it/50x50',
                            name: name,
                            message: msg.message,
                            createdAt: msg.createdAt
                        });
                        window.setTimeout(showNewest, 100);
                    });
                } else if (msg.receiverId == userId || msg.receiverId == null) {
                    if (msg.message.length > 50) {
                        msg.message = msg.message.substring(0, 50);
                        msg.message += '..';
                    }
                    $mdToast.show(
                        $mdToast.simple()
                            .content(name + ' says: ' + msg.message)
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                    if (msg.receiverId != null) {
                        $scope.persons.forEach(function (val, key) {
                            if (val.id == msg.senderId) {
                                console.log('Adding increment to persons.messages');
                                $scope.persons[key].messages += 1;
                            }
                        });
                    } else {
                        $scope.allmessages += 1;
                    }
                }
            });
        };

        $scope.changeChat = function (personId, name) {
            $scope.personId = personId;

            if (personId == '' || personId == null) {
                $scope.loadGlobalMessages($scope.project.id);
                $scope.personId = null;
                $scope.allmessages = 0;
            } else {
                $scope.loadUsersMessages($scope.project.id, personId);
                for (var i = 0; i < $scope.persons.length; i++) {
                    if ($scope.persons[i].id == personId) {
                        $scope.persons[i].messages = 0;
                    }
                }
            }

            $scope.selectedChat = 'Chatting with ' + name;
        };

        $scope.addMessage = function (message) {
            var userId = $auth.getPayload().sub;

            // Push the message to the dummy array
            if (message != '' && message != null) {
                var jsonMessage = '{ "message": "' + message + '", "userId": ' + userId + ', "projectId": ' + $scope.project.id;

                if ($scope.personId != null && $scope.personId != '')
                    jsonMessage += ', "receiverId"  : ' + $scope.personId;

                jsonMessage += ' }';

                socky.emit('chat message', jsonMessage);
            }

            // Delete the message from the input field
            $scope.message = '';

            // Stop the form from submitting
            return false;
        };

    });

function showNewest() {
    //document.querySelector('core-scaffold').$.headerPanel.scroller.scrollTop = document.querySelector('.chat-list').scrollHeight;
    var chatDiv = document.querySelector('.message-list');
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

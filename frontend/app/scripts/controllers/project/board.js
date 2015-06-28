'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('BoardCtrl', function ($scope, $state, $mdToast, $mdDialog, BoardData) {

    $scope.cur = {
      sprint: null,
      lists: [],
      items: []
    };

    $scope.$watch('$viewContentLoaded', function() {
      $scope.loadScrumboard(0);
    });

    $scope.loadScrumboard = function(sprintKey) {
      $scope.$watch('project', function() {
        if ($scope.project != null)
          BoardData.allBoards($scope.project.id)
            .success(function(data) {
              $scope.data = data.result;
              console.log($scope.data);
              if ($scope.data.Sprints === undefined)
                $scope.data.Sprints = [];
              if ($scope.data.ScrumboardLists === undefined)
                $scope.data.ScrumboardLists = [];
              if ($scope.data.ScrumboardItems === undefined)
                $scope.data.ScrumboardItems = [];
              $scope.goToSprint(sprintKey);
            });
      });
    };

    $scope.goToSprint = function(sprintKey) {
      // $scope.$watch('project', function () {
        $scope.cur = {
          sprint: null,
          lists: [],
          items: []
        };
        $scope.cur.sprint = $scope.data.Sprints[sprintKey];
        $scope.cur.sprint.key = sprintKey;

        for (var list in $scope.data.ScrumboardLists) {
          list = $scope.data.ScrumboardLists[list];
          if (list.sprintId == $scope.cur.sprint._id) {
            $scope.cur.lists[list.order] = list;

            for (var item in $scope.data.ScrumboardItems) {
                if (item.listId == list._id)
                  $scope.cur.lists[item.order] = item;
            };
          }
        };
      // });
  console.log($scope.cur);
    };

    $scope.createSprint = function () {
        if ($scope.project.id != null) {
          $scope.sprint.projectId = $scope.project.id;
          BoardData.createSprint($scope.sprint)
          .success(function(data) {
            $state.go('project.board');
            $scope.data.Sprints = $scope.data.Sprints.concat(data.result);
              $mdToast.show(
                $mdToast.simple()
                  .content('Your sprint has been created!')
                  .position('bottom left')
                  .hideDelay(3000)
              );
          })
          .error(function() {
              $mdToast.show(
                  $mdToast.simple()
                      .content('Something went wrong, please try again please')
                      .position('bottom left')
                      .hideDelay(5000)
              );
            });
      }
    };

    $scope.addList = function (ev) {
      if ($scope.cur.sprint != undefined) {

        var dialogContent = ' \
          <md-dialog><form ng-submit="hide()"> \
            <md-content> \
                <md-input-container> \
                    <label>List Name</label> \
                    <input ng-model="list.name" class="dialog-close"></input> \
                </md-input-container> \
            </md-content> \
            <div class="md-actions"> \
                <!-- type=button is needed so form uses submit button --> \
                <md-button type=button ng-click="cancel()">Cancel</md-button> \
                <md-button class="md-primary" type="submit" ng-click="hide()">Okay</md-button> \
            </div> \
          </form></md-dialog> \
        ';

        $mdDialog.show({
              template: dialogContent,
              targetEvent: ev,
              controller: 'DialogController',
              locals: {list: {name: ''}}
          })
          .then(function(list) {

            list.sprintId = $scope.cur.sprint._id;
            list.order = $scope.cur.lists.length;
            BoardData.createList(list)
            .success(function(data) {
              $state.go('project.board');
              $scope.data.ScrumboardLists = $scope.data.ScrumboardLists.concat(data.result);
              $mdToast.show(
                $mdToast.simple()
                  .content('Your list has been created!')
                  .position('bottom left')
                  .hideDelay(3000)
              );
              $scope.goToSprint($scope.cur.sprint.key);
            })
            .error(function() {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Something went wrong, please try again please')
                        .position('bottom left')
                        .hideDelay(5000)
                );
              });

          }, function() {
          });
      }
    };

    $scope.listEdit = function (ev, order) {
      if ($scope.cur.sprint != undefined) {

        var dialogContent = ' \
          <md-dialog><form ng-submit="hide()"> \
            <md-content> \
                <md-input-container> \
                    <label>List Name</label> \
                    <input ng-model="list.name" class="dialog-close"></input> \
                </md-input-container> \
            </md-content> \
            <div class="md-actions"> \
                <!-- type=button is needed so form uses submit button --> \
                <md-button type=button ng-click="cancel()">Cancel</md-button> \
                <md-button class="md-primary" type="submit" ng-click="hide()">Okay</md-button> \
            </div> \
          </form></md-dialog> \
        ';
        $scope.list = $scope.cur.lists[order];
        $mdDialog.show({
              template: dialogContent,
              targetEvent: ev,
              controller: 'DialogController',
              locals: {list: $scope.list}
          })
          .then(function(list) {

            list.sprintId = $scope.cur.sprint._id;
            BoardData.editList(list)
            .success(function(data) {
              $mdToast.show(
                $mdToast.simple()
                  .content('Your list has been created!')
                  .position('bottom left')
                  .hideDelay(3000)
              );
              $scope.loadScrumboard($scope.cur.sprint.key);
            })
            .error(function() {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Something went wrong, please try again please')
                        .position('bottom left')
                        .hideDelay(5000)
                );
              });

          }, function() {
          });
      }
    };

    $scope.listMoveLeft = function (order) {
      if (order > 0 && order < $scope.cur.lists.length) {
        var list_a = $scope.cur.lists[order];
        var list_b = $scope.cur.lists[order-1];

            list_a.order = order-1;
            list_b.order = order;
            BoardData.editList(list_a)
            .success(function(data) {
              BoardData.editList(list_b)
              .success(function(data) {
                $mdToast.show(
                  $mdToast.simple()
                    .content('Your list has been edited!')
                    .position('bottom left')
                    .hideDelay(3000)
                );
                $scope.loadScrumboard($scope.cur.sprint.key);
              })
              .error(function() {
                  $mdToast.show(
                    $mdToast.simple()
                      .content('Something went wrong, please try again please')
                      .position('bottom left')
                      .hideDelay(5000)
                  );
                });
            })
            .error(function() {
                $mdToast.show(
                  $mdToast.simple()
                    .content('Something went wrong, please try again please')
                    .position('bottom left')
                    .hideDelay(5000)
                );
              });
      }
    };

    $scope.listMoveRight = function (order) {
      if (order >= 0 && order < $scope.cur.lists.length-1) {
        var list_a = $scope.cur.lists[order];
        var list_b = $scope.cur.lists[order+1];

            list_a.order = order+1;
            list_b.order = order;
            BoardData.editList(list_a)
            .success(function(data) {
              BoardData.editList(list_b)
              .success(function(data) {
                $mdToast.show(
                  $mdToast.simple()
                    .content('Your list has been edited!')
                    .position('bottom left')
                    .hideDelay(3000)
                );
                $scope.loadScrumboard($scope.cur.sprint.key);
              })
              .error(function() {
                  $mdToast.show(
                    $mdToast.simple()
                      .content('Something went wrong, please try again please')
                      .position('bottom left')
                      .hideDelay(5000)
                  );
                });
            })
            .error(function() {
                $mdToast.show(
                  $mdToast.simple()
                    .content('Something went wrong, please try again please')
                    .position('bottom left')
                    .hideDelay(5000)
                );
              });
      }
    };

    $scope.deleteList = function(event, id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .parent(angular.element(document.body))
          .title('Would you like to delete this item?')
          .content('The item you are about to delete is "' + id + '".')
          .ok('Ok')
          .cancel('Cancel')
          .targetEvent(event);
        $mdDialog.show(confirm).then(function() {
          BoardData.deleteList($scope.project.id, id)
          .success(function(item) {
            for (var key in $scope.backlogs) {
                if ($scope.backlogs[key].id == item.result.id) {
                    $scope.backlogs.splice(key, 1);
                }
            }
          });
        });
    };

  })

  .controller('DialogController', function($scope, $mdDialog, list) {
      $scope.list = list;

      $scope.hide = function() {
          $mdDialog.hide($scope.list);
      };
      
      $scope.cancel = function() {
          $mdDialog.cancel();
      };
  });
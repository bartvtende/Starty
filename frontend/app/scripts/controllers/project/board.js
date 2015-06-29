'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('BoardCtrl', function ($scope, $state, $mdToast, $mdDialog, BoardData, MessageData) {

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
          $scope.cur.lists[list.order].items = [];

          for (var item in $scope.data.ScrumboardItems) {
            item = $scope.data.ScrumboardItems[item];
              if (item.listId == list._id)
                $scope.cur.lists[list.order].items = $scope.cur.lists[list.order].items.concat(item);
          }
        }
      }
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
                <md-input-container> \
                    <label>List Completed</label> \
                    <md-switch class="md-secondary" ng-model="list.completed"></md-switch> \
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
              controller: 'ListDialogController',
              locals: {list: {name: '', completed: false}}
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
                <md-input-container> \
                    <label>List Completed</label> \
                    <md-switch class="md-secondary" ng-model="list.completed"></md-switch> \
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
              controller: 'ListDialogController',
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

    $scope.deleteList = function(event, order) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Would you like to delete this list?')
        .ok('Ok')
        .cancel('Cancel')
        .targetEvent(event);
      $mdDialog.show(confirm).then(function() {
        BoardData.deleteList($scope.cur.lists[order]._id)
        .success(function(list) {
          console.log("deleted: "+list);
          $scope.loadScrumboard($scope.cur.sprint.key);
        });
      });
    };

    $scope.addItem = function (ev, listId) {
      if ($scope.cur.sprint != undefined) {

        var dialogContent = ' \
          <md-dialog> \
            <md-content> \
              <md-input-container> \
                  <label>Item Name</label> \
                  <input ng-model="item.title" class="dialog-close"></input> \
              </md-input-container> \
              <md-input-container> \
                  <label>Item Shortcode</label> \
                  <input ng-model="item.shortcode" class="dialog-close"></input> \
              </md-input-container> \
              <md-input-container> \
                  <label>Item Description</label> \
                  <input ng-model="item.description" class="dialog-close"></input> \
              </md-input-container> \
              <md-input-container> \
                  <label>Expected Time</label> \
                  <input ng-model="item.expectedTime" type="number" class="dialog-close"></input> \
              </md-input-container> \
              <md-input-container> \
                  <label>Status</label> \
                  <input ng-model="item.status" class="dialog-close"></input> \
              </md-input-container> \
              <md-input-container> \
                  <label>List</label> \
                  <md-select ng-model="item.listId" style="min-width: 200px;"> \
                    <md-option ng-repeat="list in cur.lists" value="{{list._id}}">{{list.name}}</md-option> \
                  </md-select> \
              </md-input-container> \
              <md-input-container> \
                  <label>Users</label> \
                  <md-select ng-model="item.user" style="min-width: 200px;"> \
                    <md-option ng-repeat="(key, user) in users" value="{{key}}">{{user.name}}</md-option> \
                  </md-select> \
                  <md-button aria-label="Add" class="md-fab md-raised md-primary md-mini" ng-click="addUser()" style="float:right"> \
                    Add \
                  </md-button> \
              </md-input-container> \
              <md-input-container> \
                  <md-button ng-repeat="(key, user) in item.assignedUsers" aria-label="left" ng-click="removeUser({{key}})"> \
                    <md-icon md-svg-src="images/icons/ic_delete_24px.svg"></md-icon> \
                    {{user.name}} \
                  </md-button> \
              </md-input-container> \
            </md-content> \
            <div class="md-actions"> \
                <!-- type=button is needed so form uses submit button --> \
                <md-button type=button ng-click="cancel()">Cancel</md-button> \
                <md-button class="md-primary" type="submit" ng-click="hide()">Okay</md-button> \
            </div> \
          </md-dialog> \
        ';

        self.item = {assignedUsers: [], listId: listId};
        self.cur = $scope.cur;
        MessageData.getUsers()
            .success(function(users) {
              self.users = users.result;
            $mdDialog.show({
                  template: dialogContent,
                  targetEvent: ev,
                  controller: 'ItemDialogController',
                  locals: self
              })
              .then(function(item) {
                console.log(item);
                BoardData.createItem(item)
                .success(function(data) {
                  $state.go('project.board');
                  $scope.data.ScrumboardItems = $scope.data.ScrumboardItems.concat(data.result);
                  $mdToast.show(
                    $mdToast.simple()
                      .content('Your item has been created!')
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
            })
            .error(function() {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Something went wrong while fetching the users info!')
                        .position('bottom left')
                        .hideDelay(3000)
                );
            });
      }
    };

    $scope.itemEdit = function (ev, listKey, itemKey) {
      if ($scope.cur.sprint != undefined) {

        var dialogContent = ' \
          <md-dialog> \
            <md-content> \
              <md-input-container> \
                  <label>Item Name</label> \
                  <input ng-model="item.title" class="dialog-close"></input> \
              </md-input-container> \
              <md-input-container> \
                  <label>Item Shortcode</label> \
                  <input ng-model="item.shortcode" class="dialog-close"></input> \
              </md-input-container> \
              <md-input-container> \
                  <label>Item Description</label> \
                  <input ng-model="item.description" class="dialog-close"></input> \
              </md-input-container> \
              <md-input-container> \
                  <label>Item Status</label> \
                  <input ng-model="item.status" class="dialog-close"></input> \
              </md-input-container> \
              <md-input-container> \
                  <label>List</label> \
                  <md-select ng-model="item.listId" style="min-width: 200px;"> \
                    <md-option ng-repeat="list in cur.lists" value="{{list._id}}">{{list.name}}</md-option> \
                  </md-select> \
              </md-input-container> \
              <md-input-container> \
                  <label>Users</label> \
                  <md-select ng-model="item.user" style="min-width: 200px;"> \
                    <md-option ng-repeat="(key, user) in users" value="{{key}}">{{user.name}}</md-option> \
                  </md-select> \
                  <md-button aria-label="Add" class="md-fab md-raised md-primary md-mini" ng-click="addUser()" style="float:right"> \
                    Add \
                  </md-button> \
              </md-input-container> \
              <md-input-container> \
                  <md-button ng-repeat="(key, user) in item.assignedUsers" aria-label="left" ng-click="removeUser({{key}})"> \
                    <md-icon md-svg-src="images/icons/ic_delete_24px.svg"></md-icon> \
                    {{user.name}} \
                  </md-button> \
              </md-input-container> \
            </md-content> \
            <div class="md-actions"> \
                <!-- type=button is needed so form uses submit button --> \
                <md-button type=button ng-click="remove()">Remove</md-button> \
                <md-button type=button ng-click="cancel()">Cancel</md-button> \
                <md-button class="md-primary" type="submit" ng-click="hide()">Okay</md-button> \
            </div> \
          </md-dialog> \
        ';
        self.item = $scope.cur.lists[listKey].items[itemKey];
        self.cur = $scope.cur;

        MessageData.getUsers()
            .success(function(users) {
              self.users = users.result;

              $mdDialog.show({
                    template: dialogContent,
                    targetEvent: ev,
                    controller: 'ItemDialogController',
                    locals: self
                })
                .then(function(item) {
                  if (item.remove == undefined) {
                    BoardData.editItem(item)
                    .success(function(data) {
                      $mdToast.show(
                        $mdToast.simple()
                          .content('Your item has been created!')
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
                  } else {
                    BoardData.deleteItem(item._id)
                    .success(function(data) {
                      $mdToast.show(
                        $mdToast.simple()
                          .content('Your item has been removed!')
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
                  }

                }, function() {
                });

              })
            .error(function() {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Something went wrong while fetching the users info!')
                        .position('bottom left')
                        .hideDelay(3000)
                );
            });
      }
    };

    $scope.deleteItem = function(event, order) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .parent(angular.element(document.body))
          .title('Would you like to delete this item?')
          .ok('Ok')
          .cancel('Cancel')
          .targetEvent(event);
        $mdDialog.show(confirm).then(function() {
          BoardData.deleteItem($scope.cur.items[order]._id)
          .success(function(item) {
            console.log("deleted: "+item);
            $scope.loadScrumboard($scope.cur.sprint.key);
          });
        });
    };

  })

  .controller('ListDialogController', function($scope, $mdDialog, list) {
      $scope.list = list;

      $scope.hide = function() {
          $mdDialog.hide($scope.list);
      };
      
      $scope.cancel = function() {
          $mdDialog.cancel();
      };
  })

  .controller('ItemDialogController', function($scope, $mdDialog, item, users, cur) {
      $scope.item = item;
      $scope.users = users;
      $scope.cur = cur;

      $scope.hide = function() {
          $mdDialog.hide($scope.item);
      };

      $scope.remove = function() {
        $scope.item.remove = true;
        $mdDialog.hide($scope.item);
      };
      
      $scope.cancel = function() {
          $mdDialog.cancel();
      };
      
      $scope.addUser = function() {
        var cont = true;
        for (var user in $scope.item.assignedUsers) {
          if($scope.item.assignedUsers[user].id === $scope.users[$scope.item.user].id)
            cont = false;
        }
        if (cont)
          $scope.item.assignedUsers = $scope.item.assignedUsers.concat($scope.users[$scope.item.user]);
      };
      
      $scope.removeUser = function(key) {
        var index = $scope.item.assignedUsers[key];
        $scope.item.assignedUsers.splice(index, 1);
      };

  });
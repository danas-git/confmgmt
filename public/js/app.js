angular.module('cms', ['ui.router','xeditable','ngRoute', 'appRoutes','LoginControllerModule','LoginServiceModule',
    'UserControllerModule','UserServiceModule','HomeControllerModule','HomeServiceModule','PreReqServiceModule','PreReqControllerModule',
    'editUserControllerModule','RemoveReqControllerModule','ConfControllerModule','ConfServiceModule','ConfControllerNormalUserModule',
    'ConfServiceNormalModule','MyConfServiceModule','MyConfControllerModule','SubmissionControllerModule','SubmissionServiceModule'
]).run(function(editableOptions,$rootScope) {
    editableOptions.theme = 'bs3';
    $rootScope.value = {
        getId: function(row) {
            return row._id
        }
    }
});

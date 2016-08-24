angular.module('cms', ['ui.router','xeditable','ngRoute', 'appRoutes','LoginControllerModule','LoginServiceModule',
    'UserControllerModule','UserServiceModule','HomeControllerModule','HomeServiceModule','PreReqServiceModule','PreReqControllerModule',
    'editUserControllerModule','RemoveReqControllerModule','ConfControllerModule','ConfServiceModule'
]).run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});

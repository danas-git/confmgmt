angular.module('cms', ['ui.router','xeditable','ngRoute', 'appRoutes','LoginControllerModule','LoginServiceModule',
    'UserControllerModule','UserServiceModule','HomeControllerModule','HomeServiceModule','PreReqServiceModule','PreReqControllerModule',
    'editUserControllerModule','RemoveReqControllerModule'
]).run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});

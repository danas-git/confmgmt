angular.module('cms', ['ui.router','xeditable','ngRoute', 'appRoutes','LoginControllerModule','LoginServiceModule',
    'UserControllerModule','UserServiceModule','HomeControllerModule','HomeServiceModule','EditUserControllerModule'
]).run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});

angular.module('cms', ['ui.router','xeditable','ngRoute', 'appRoutes','LoginControllerModule','LoginServiceModule',
    'UserControllerModule','UserServiceModule'
]).run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});

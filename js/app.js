'use strict';

/* App Module */

angular.module('auto', ['autoFilters', 'autoServices', 'autoDirectives']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('', {templateUrl: 'partials/autos.html',   controller: AutosCtrl}).
      when('/marque/:marqueId', {templateUrl: 'partials/marque.html', controller: MarqueCtrl}).
      when('/marque/:marqueId/:modeleId', {templateUrl: 'partials/marque.html', controller: MarqueCtrl}).
      when('/version/:versionId', {templateUrl: 'partials/version.html', controller: VersionCtrl}).
      when('/saisie/:action/:objet', {templateUrl: 'partials/saisie.html', controller: SaisieCtrl}).
      otherwise({redirectTo: ''});
}]);


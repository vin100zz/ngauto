'use strict';

/* Controllers */

function AutosCtrl($scope, Auto) {
  $scope.marques = Auto.query();
  
  $scope.$parent.$root.pageTitle = "";
  
  $scope.predicate = 'nomMarque';
  
  $scope.reverseAlpha = false;
  $scope.reversePays = false;
  
  $scope.doReverseAlpha = function()
  {
	  var value = $scope.reverseAlpha;
	  $scope.reverseAlpha = !$scope.reverseAlpha;
	  $scope.reversePays = false;
	  return value;
  }
  $scope.doReversePays = function()
  {
	  var value = $scope.reversePays;
	  $scope.reverseAlpha = false;
	  $scope.reversePays = !$scope.reversePays;
	  return value;
  }
}

//AutoListCtrl.$inject = ['$scope', 'Auto'];

function MarqueCtrl($scope, $routeParams, Auto) {
  $scope.marque = Auto.get({service: 'marque', id: $routeParams.marqueId}, function(marque) {
	  $scope.histo = marque.histo;
	  $scope.$parent.$root.pageTitle = " - " + marque.nomMarque;  
  });
}

//AutoDetailCtrl.$inject = ['$scope', '$routeParams', 'Auto'];

function VersionCtrl($scope, $routeParams, Auto) {
  $scope.version = Auto.get({service: 'version', id: $routeParams.versionId, index: $routeParams.index}, function(version) {
	  
	  $scope.$parent.$root.pageTitle = " - " + version.marque.nomMarque + " - " + version.modele.nomModele;
	  
	  var legend = [];
	  if(version.doc.source != '') legend.push(version.doc.source);
	  if(version.doc.date != '') legend.push(version.doc.date);
	  if(version.doc.legende != '') legend.push(version.doc.legende);
	  
	  $scope.legend = legend.join(' - ');
	   
  });
  $scope.versionId = $routeParams.versionId;
  $scope.index = parseInt($routeParams.index);
}


function SaisieCtrl($scope, $routeParams, Auto) {
	  $scope.saisie = Auto.get({service: 'saisie', action: $routeParams.action, objet: $routeParams.objet, id: $routeParams.id}, function(saisie) {
		  $scope.$parent.$root.pageTitle = " - Saisie";
		  $scope.objet = saisie.objet;
		  
		  if(saisie.action == "edit")
			  $scope.saisie.ordre = parseInt(saisie.ordre);
		  else 
			  $scope.saisie.ordre = 0;
	  });	  
	  
	  $scope.updated = false;
	  
	  $scope.update = function()
	  {
		  Auto.save({service: 'update'}, this.saisie, function(update) {
			  $scope.status = update;
			  $scope.updated = true;
		  });
	  };
}


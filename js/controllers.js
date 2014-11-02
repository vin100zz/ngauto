'use strict';

function AutosCtrl($scope, Auto) {
  $scope.marques = Auto.query();
  
  $scope.$parent.$root.pageTitle = "";
  
  $scope.backgroundImage = function(marque) {
    return {'background-image': 'url(img/logo/' + marque.idMarque + '.png)'};
  }
  
  $scope.goToMarque = function(marque) {
    window.location = '#/marque/' + marque.idMarque;
  }
  
  $scope.goToMesAutosAMoi = function () {
    window.location = '#/marque/1129';
  }
  
}

// ------------------------------------------------------------------------------------------------------

function MarqueCtrl($scope, $routeParams, $location, $anchorScroll, Auto) {
  $scope.marque = Auto.get({service: 'marque', id: $routeParams.marqueId}, function(marque) {
	  $scope.histo = marque.histo;
	  $scope.$parent.$root.pageTitle = " - " + marque.nomMarque;
	  
    setTimeout(function () {
	    $anchorScroll();
    }, 100);
    
    var events = [];
    for (var i=0; i<marque.modeles.length; ++i) {
      var modele = marque.modeles[i];
      events.push({
        begin: modele.debut,
        end: modele.fin,
        name: modele.nomModele,
        picture: modele.versions.length > 0 ? modele.versions[0].img : null,
        link: '#/marque/' + marque.idMarque + '#modele-' + modele.idModele
      });
    }
    
    drawTimeline({
      container: document.querySelector('#timeline'),
      events: events
    });
  });
  
  $scope.toggle = 'MODELES';
    
  $scope.showModeles = function() {
    $scope.toggle = 'MODELES';
  }
  $scope.showTimeline = function() {
    $scope.toggle = 'TIMELINE';
  }
  $scope.showHistoire = function() {
    $scope.toggle = 'HISTOIRE';
  }
  
  $scope.backgroundImage = function(version) {
    return {'background-image': 'url(' + version.img + ')'};
  }
  
  $scope.goToVersion = function(marque) {
    window.location = "#/version/" + marque.idVersion;
  }
}

//------------------------------------------------------------------------------------------------------

function VersionCtrl($scope, $routeParams, Auto) {
  $scope.version = Auto.get({service: 'version', id: $routeParams.versionId}, function(version) {
	  
	  $scope.$parent.$root.pageTitle = " - " + version.marque.nomMarque + " - " + version.modele.nomModele;
	  $scope.versionId = $routeParams.versionId;
  });
  
  $scope.selected = 0;
  
  $scope.getLegend = function() {
    var doc = $scope.version.docs[$scope.selected];
    var legend = [];
    if(doc.source != '') legend.push(doc.source);
    if(doc.date != '') legend.push(doc.date);
    if(doc.legende != '') legend.push(doc.legende);
    return legend.join(' - ');
  }
  
  $scope.backgroundImage = function(index) {
    if (!$scope.version.docs) {
      return null;
    }
    return {'background-image': 'url(' + getImage(index) + ')'};
  }
  
  var getImage = function (index) {
     return 'img/version/' + $scope.version.docs[index].idDocumentVersion + '.jpg';
  };
  
  $scope.maximize = function(index) {
    $scope.selected = index;
  }
  
  $scope.openInNewWindow = function() {
    window.open(getImage($scope.selected));
  }
}

//------------------------------------------------------------------------------------------------------

function SaisieCtrl($scope, $routeParams, Auto) {
  $scope.saisie = Auto.get({service: 'saisie', action: $routeParams.action, objet: $routeParams.objet, id: $routeParams.id}, function(saisie) {
    $scope.$parent.$root.pageTitle = ' - Saisie';
    $scope.objet = saisie.objet;
		  
		  if(saisie.action == "edit")
			  $scope.saisie.ordre = parseInt(saisie.ordre);
		  else 
			  $scope.saisie.ordre = 0;
		  
	    $scope.modeleSorterCfg = {
	      show: $scope.objet === 'marque',
	      label: 'Ordre des modèles',
	      list: $scope.saisie.modeles,
	      idFn: function(item) {return item.idModele;},
        labelFn: function(item) {return item.nomModele;}
	    }
	    
	    $scope.versionSorterCfg = {
        show: $scope.objet === 'modele',
        label: 'Ordre des versions',
        list: $scope.saisie.versions,
        idFn: function(item) {return item.idVersion;},
        labelFn: function(item) {return item.nom + (item.type ? ' ' + item.type : '') + (item.anneeModele ? ' (' + item.anneeModele + ')' : '');}
      }
	  });
	  
	  $scope.update = function() {
	    if ($scope.saisie.objet === 'marque') {
  	    $scope.saisie.modeleOrder = [];
  	    for (var i=0; i<$scope.saisie.modeles.length; ++i) {
  	      $scope.saisie.modeleOrder.push($scope.saisie.modeles[i].idModele);
  	    }
  	  } else if ($scope.saisie.objet === 'modele') {
        $scope.saisie.versionOrder = [];
        for (var i=0; i<$scope.saisie.versions.length; ++i) {
          $scope.saisie.versionOrder.push($scope.saisie.versions[i].idVersion);
        }
  	  }
		  Auto.save({service: 'update'}, this.saisie, function(update) {
		    history.back();
		  });
	  };
}

//------------------------------------------------------------------------------------------------------

function SearchCtrl($scope, $routeParams, Auto) {
  $scope.list = Auto.get({service: 'list'}, function(version) {});
  
  $scope.show = false;
  
  $scope.showResults = function(evt) {
    $scope.show = true;
    evt.stopPropagation();
  }
  $scope.hideResults = function() {
    $scope.show = false;
  }
  
  $scope.goToMarque = function (marque) {
    $scope.show = false;
    window.location = '#/marque/' + marque.idMarque;
  }
  $scope.goToModele = function (modele) {
    $scope.show = false;
    window.location = '#/marque/' + modele.idMarque + '#modele-' + modele.idModele;
  }
}

'use strict';

/* Services */

angular.module('autoServices', ['ngResource']).
    factory('Auto', function($resource){
  return $resource('autos/:service.php', {}, {
    query: {method:'GET', params:{'service': 'autos'}, isArray:true}
  });
})


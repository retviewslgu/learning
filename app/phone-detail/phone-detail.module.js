angular.module('phoneDetail', [
  'ngRoute' // for id
    // NB : Since ngRoute is also a dependency of the main phonecatApp module,
        // its services and directives are already available everywhere in the application
    // here : keep modularity, and reusability of this component without this coupling
    // Angular will only instantiate it once
]);
angular.module('app')
  .directive('app', function() {


    return {
      scope: {
        authenticated: '<',
        service: '<'
      },
      restrict: 'E',
      controllerAs: 'app',
      bindToController: true,
      controller: function($location, appServices, NgMap, $window, authService) {
        if ( localStorage.getItem('id_token') ) {
          authService.authenticateOnRefresh();
        } else {
          authService.login();
        }

        this.currentItineraryId;
        this.itineraries = [];
        this.markers = [];
        this.mapCenter = 'San Francisco';
        this.mapType = 'TERRAIN';

        this.switch = (viewport, id) => {
          if (id) {
            this.currentItineraryId = id;
            $location.path(viewport + '/' + id);
          } else {
            $location.path(viewport);
          }

          this.template = '/templates/' + viewport + '.html';
        }

        if ( $location.url() !== '/' ) {
          this.template = '/templates' + $location.path() + '.html';
        } else {
          this.switch('trip');
        }

        this.getCurrentLocation = (e) => {
          var lat = e.latLng.lat();
          var long = e.latLng.lng();
          var latLong = {
            latitude: lat,
            longitude: long,
          }
          appServices.getLocation(latLong, (res) => {
            this.mapCenter = res.data;
          });
        }

        NgMap.getMap().then((map) => {
          this.map = map;
          map.getCenter();
          this.getMarkerLocations();
        });

        this.searchLocation = (newLoc) => {
          this.mapCenter = newLoc;
        }

        this.getMarkerLocations = () => {
          appServices.getMarkers(this.currentItineraryId, ({data}) => {
            data.forEach(d => this.markers.push(d));
          });
        }

        this.addMarker = (place, date, time, desc) => {
          var destination = this.mapCenter === place ? place : this.mapCenter;
          var reqObj = {
            id: this.currentItineraryId,
            text: destination,
            date: date,
            time: time
          }

          appServices.sendCoords(reqObj, (res) => {
            $window.location.reload();
          });
        }

        // Get user itineraries for itineraries view
        appServices.getItineraries( (res) => {
          for ( var itinerary of res.data ) {
            this.itineraries.push(itinerary);
          }
        });

        // Create an itinerary for the user
        this.addItinerary = (name, start, end) => {
          var submissionData = {
            name: name,
            start: start,
            end: end
          };
          appServices.submitItinerary(submissionData, (res) => {
            $window.location.reload();
          });
        }
      },
      templateUrl: './templates/app.html'
    }
  });

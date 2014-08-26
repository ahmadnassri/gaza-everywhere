google.maps.event.addDomListener(window, 'load', function initialize() {
  // variables

  var search = document.getElementById('search');
  var slider = document.getElementById('slider');
  var download = document.getElementById('download');
  var controls = document.getElementById('controls');

  var defaults = {
    zoom: 10,
    center: '31.407902,34.394186'
  };

  // functions

  function movePoly () {
    gaza.moveTo(map.getCenter());
    updateDownloadLink();
  }

  function updateDownloadLink () {
    var coords = [];
    gaza.getPath().forEach(function (element, index) {
      coords.push(element.toUrlValue());
    });

    // set the download link
    download.href = 'http://maps.googleapis.com/maps/api/staticmap?maptype=' + map.getMapTypeId() + '&format=png32&center=' + map.getCenter().toUrlValue() + '&zoom=' + map.getZoom() + '&size=640x360&scale=2&path=color:0xFF0000|fillcolor:0xFF0000|weight:2|' + coords.join('|');

    // modern browsers only
    if (history.pushState) {
      var path = window.location.pathname + '?center=' + map.getCenter().toUrlValue() + '&zoom=' + map.getZoom();

      // update url
      history.replaceState({}, document.title, path);
    }

    // update embed link
    var code = document.getElementsByTagName('pre')[0];
    code.innerHTML = '&lt;iframe width="1280" height="720" src="{url}" frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;'.replace('{url}', window.location.href);
  }

  // polygon

  var gazaCoords = [
    new google.maps.LatLng(31.594182039540698, 34.490203857421875),
    new google.maps.LatLng(31.540650975483548, 34.56693649291992),
    new google.maps.LatLng(31.533335603314153, 34.565391540527344),
    new google.maps.LatLng(31.526897601690482, 34.55818176269531),
    new google.maps.LatLng(31.512556821313215, 34.54719543457031),
    new google.maps.LatLng(31.503043865128223, 34.52625274658203),
    new google.maps.LatLng(31.500409336857828, 34.51286315917969),
    new google.maps.LatLng(31.479916027543375, 34.48488235473633),
    new google.maps.LatLng(31.47698804541903, 34.4780158996582),
    new google.maps.LatLng(31.471424626993848, 34.47441101074219),
    new google.maps.LatLng(31.461907486782405, 34.46428298950195),
    new google.maps.LatLng(31.443749028676486, 34.44540023803711),
    new google.maps.LatLng(31.440380540593694, 34.43681716918945),
    new google.maps.LatLng(31.427198336472603, 34.4256591796875),
    new google.maps.LatLng(31.41723721962633, 34.4117546081543),
    new google.maps.LatLng(31.41357477833999, 34.4066047668457),
    new google.maps.LatLng(31.40185400542644, 34.39321517944336),
    new google.maps.LatLng(31.3898386940066, 34.37999725341797),
    new google.maps.LatLng(31.388080226769475, 34.380340576171875),
    new google.maps.LatLng(31.376795945179563, 34.373130798339844),
    new google.maps.LatLng(31.374304427605047, 34.373130798339844),
    new google.maps.LatLng(31.372692233968184, 34.37089920043945),
    new google.maps.LatLng(31.37005403926066, 34.37278747558594),
    new google.maps.LatLng(31.36932119425316, 34.37021255493164),
    new google.maps.LatLng(31.369760901943426, 34.36729431152344),
    new google.maps.LatLng(31.36419111919158, 34.36471939086914),
    new google.maps.LatLng(31.306861822087118, 34.37347412109375),
    new google.maps.LatLng(31.290140312178803, 34.366607666015625),
    new google.maps.LatLng(31.27855085894653, 34.34257507324219),
    new google.maps.LatLng(31.261677590216173, 34.33124542236328),
    new google.maps.LatLng(31.252579445611293, 34.31905746459961),
    new google.maps.LatLng(31.24039829876376, 34.290218353271484),
    new google.maps.LatLng(31.219774825076353, 34.26738739013672),
    new google.maps.LatLng(31.296007846514883, 34.23966407775879),
    new google.maps.LatLng(31.296521238391374, 34.23545837402344),
    new google.maps.LatLng(31.323507044116365, 34.21846389770508),
    new google.maps.LatLng(31.38881292545334, 34.2938232421875),
    new google.maps.LatLng(31.48957771850194, 34.39990997314453),
    new google.maps.LatLng(31.53084824620859, 34.43836212158203),
    new google.maps.LatLng(31.59286607048565, 34.48986053466797)
  ];

  // get query string data
  var query = window.location.search.substring(1).split('&');

  for (var i in query) {
    var param = query[i].split('=');
    defaults[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
  }

  // split coords
  defaults.center = defaults.center.split(',');

  // init map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: Number(defaults.zoom),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(defaults.center[0], defaults.center[1]),

    scaleControl: false,
    rotateControl: false,
    streetViewControl: false,

    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE],
      position: google.maps.ControlPosition.TOP_RIGHT
    },


    panControl: true,
    panControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },

    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    }
  });

  // assign search box
  var searchBox = new google.maps.places.SearchBox(search);

  // draw the polygon.
  var gaza = new google.maps.Polygon({
    map: map,
    paths: gazaCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    draggable: true,
    geodesic: true
  });

  // move to center (in case of query string params)
  //gaza.moveTo(map.getCenter());

  // update the download link
  updateDownloadLink();

  // events

  google.maps.event.addListener(searchBox, 'places_changed', function search () {
    var places = searchBox.getPlaces();

    if (places.length !== 0) {
      map.setCenter(places[0].geometry.location);
      map.setZoom(10);
      gaza.moveTo(map.getCenter());
    }
  });


  google.maps.event.addListener(map, 'dragend', movePoly);
  google.maps.event.addListener(map, 'zoom_changed', movePoly);
  google.maps.event.addListener(map, 'projection_changed', movePoly);
  google.maps.event.addListener(map, 'zoom_changed', updateDownloadLink);

  google.maps.event.addListener(gaza, 'dragend', updateDownloadLink);

  var distanceTo = function (pointA, pointB) {
    var distance, x0, y0, x1, y1, result;
    x0 = pointA.lat();
    y0 = pointA.lng();
    x1 = pointB.lat();
    y1 = pointB.lng();

    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
  };

  var rotatePoint = function (angle, point, origin) {
    angle *= Math.PI / 180;
    var radius = distanceTo(point, origin);
    var theta = angle + Math.atan2(point.lng() - origin.lng(), point.lat() - origin.lat());
    var x = origin.lat() + (radius * Math.cos(theta));
    var y = origin.lng() + (radius * Math.sin(theta));
    return new google.maps.LatLng(x, y);
  };

  var getCenter = function (polygonCoords) {
    var bounds = new google.maps.LatLngBounds();
    var i;

    for (i = 0; i < polygonCoords.length; i++) {
      bounds.extend(polygonCoords[i]);
    }

    // The Center of the Bermuda Triangle - (25.3939245, -72.473816)
    return bounds.getCenter();
  }

  google.maps.event.addListener(gaza, 'click', function rotate () {
    var coords = gaza.getPaths().pop().getArray();

    var origin = getCenter(coords);

    coords.forEach(function (point, index) {
      coords[index] = rotatePoint(point, origin);
    });

    gaza.setPaths(coords);
  });

  Array.prototype.forEach.call(document.getElementsByClassName('btn-rotate'), function addEventListener (button) {
    button.addEventListener('click', function slide (event) {
      event.preventDefault();

      var angle = Number(this.dataset.angle) * 10;

      var coords = gaza.getPaths().pop().getArray();

      var origin = getCenter(coords);

      coords.forEach(function (point, index) {
        coords[index] = rotatePoint(angle, point, origin);
      });

      gaza.setPaths(coords);

      updateDownloadLink();
    });
  });

  /*
  function rotateLatLng (pointLat, pointLng, angle) {
    var pos = map.getCenter();
    var theX = pointLat;
    var theY = pointLng;
    var rotationTheta = angle;
    var rotationOriginX = pos.lat();
    var rotationOriginY = pos.lng();
    var rotationThetaRad = rotationTheta*(Math.PI/180);

    var newX;
    var newY;

    if (rotationOriginX == 0 && rotationOriginY == 0) {
      newX = theX * Math.cos(rotationThetaRad) - Math.sin(rotationThetaRad) * theY;
      newY = theX * Math.sin(rotationThetaRad) + Math.cos(rotationThetaRad) * theY;
    } else {
      newX = (theX - rotationOriginX) * Math.cos(rotationThetaRad) - (theY - rotationOriginY) * Math.sin(rotationTheta) + rotationOriginX;
      newY = (theX - rotationOriginX) * Math.sin(rotationThetaRad) + (theY - rotationOriginY) * Math.cos(rotationTheta) + rotationOriginY;
    }

    return new google.maps.LatLng(newX,newY);
  }
  */

  // share buttons
  Array.prototype.forEach.call(document.getElementsByClassName('btn-share'), function addEventListener (button) {
    button.addEventListener('click', function click (event) {
      event.preventDefault();

      var link = this.href;

      link = link.replace('{url}', window.location.href);
      link = link.replace('{text}', encodeURIComponent('Gaza Everywhere: Compare the size of #Gaza to your city'));

      window.open(link, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');

      return false;
    });
  });
});

function resizeContent () {
  var screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var header = document.getElementsByTagName('header')[0].offsetHeight;
  var panelFooter = document.getElementsByClassName('panel-footer')[0].offsetHeight;
  var panelHeading = document.getElementsByClassName('panel-heading')[0].offsetHeight;

  // resize viewport
  var newHeight = screenHeight - (header + panelFooter + panelHeading + 30);

  if (newHeight > 300) {
    document.getElementById('map').style.height = newHeight + 'px';
  }

  document.getElementById('twitter').style.height = (screenHeight - (header + document.getElementsByClassName('list-group')[0].offsetHeight + 30 + 20 - 2)) + 'px';
}

window.addEventListener('load', resizeContent);
window.addEventListener('resize', resizeContent);

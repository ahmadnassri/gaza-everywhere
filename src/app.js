function initializeMap () {
  // variables

  const search = document.getElementById('search')
  const slider = document.getElementById('slider')
  const download = document.getElementById('download')
  const controls = document.getElementById('controls')

  const defaults = {
    zoom: 10,
    center: '31.407902,34.394186'
  }

  // functions

  function movePoly () {
    gaza.moveTo(map.getCenter())
    updateDownloadLink()
  }

  function updateDownloadLink () {
    const coords = []
    gaza.getPath().forEach(function (element, index) {
      coords.push(element.toUrlValue())
    })

    // set the download link
    download.href = 'http://maps.googleapis.com/maps/api/staticmap?key=AIzaSyB2Q35HUqOoEHJhCNb1b2paI7iEZKPMcTU&maptype=' + map.getMapTypeId() + '&format=png32&center=' + map.getCenter().toUrlValue() + '&zoom=' + map.getZoom() + '&size=640x360&scale=2&path=color:0xFF0000|fillcolor:0xFF0000|weight:2|' + coords.join('|')

    // modern browsers only
    if (history.pushState) {
      const path = window.location.pathname + '?center=' + map.getCenter().toUrlValue() + '&zoom=' + map.getZoom()

      // update url
      history.replaceState({}, document.title, path)
    }

    // update embed link
    const code = document.getElementsByTagName('pre')[0]
    code.innerHTML = '&lt;iframe width="1280" height="720" src="{url}" frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;'.replace('{url}', window.location.href)
  }

  // polygon

  const gazaCoords = [
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
  ]

  // get query string data
  const query = window.location.search.substring(1).split('&')

  for (const i in query) {
    const param = query[i].split('=')
    defaults[decodeURIComponent(param[0])] = decodeURIComponent(param[1])
  }

  // split coords
  defaults.center = defaults.center.split(',')

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
  })

  // assign search box
  const searchBox = new google.maps.places.SearchBox(search)

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
  })

  // update the download link
  updateDownloadLink()

  // events

  google.maps.event.addListener(searchBox, 'places_changed', function search () {
    const places = searchBox.getPlaces()

    if (places.length !== 0) {
      map.setCenter(places[0].geometry.location)
      map.setZoom(10)
      gaza.moveTo(map.getCenter())
    }
  })

  google.maps.event.addListener(map, 'dragend', movePoly)
  google.maps.event.addListener(map, 'zoom_changed', movePoly)
  google.maps.event.addListener(map, 'projection_changed', movePoly)
  google.maps.event.addListener(map, 'zoom_changed', updateDownloadLink)

  google.maps.event.addListener(gaza, 'dragend', updateDownloadLink)

  google.maps.event.addListener(gaza, 'click', function rotate () {
    const origin = gaza.getCenter()

    gaza.rotate(10, origin)

    updateDownloadLink()
  })

  Array.prototype.forEach.call(document.getElementsByClassName('btn-rotate'), function addEventListener (button) {
    button.addEventListener('click', function slide (event) {
      event.preventDefault()

      const angle = Number(this.dataset.angle)

      const origin = gaza.getCenter()

      gaza.rotate(angle, origin)

      updateDownloadLink()
    })
  })

  // share buttons
  Array.prototype.forEach.call(document.getElementsByClassName('btn-share'), function addEventListener (button) {
    button.addEventListener('click', function click (event) {
      event.preventDefault()

      let link = this.href

      link = link.replace('{url}', window.location.href)
      link = link.replace('{text}', encodeURIComponent('Gaza Everywhere: Compare the size of #Gaza to your city'))

      window.open(link, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')

      return false
    })
  })
}

function resizeContent () {
  const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  const header = document.getElementsByTagName('header')[0].offsetHeight
  const panelFooter = document.getElementsByClassName('panel-footer')[0].offsetHeight
  const panelHeading = document.getElementsByClassName('panel-heading')[0].offsetHeight

  // resize viewport
  const newHeight = screenHeight - (header + panelFooter + panelHeading + 30)

  if (newHeight > 300) {
    document.getElementById('map').style.height = newHeight + 'px'
  }
}

window.addEventListener('load', resizeContent)
window.addEventListener('resize', resizeContent)

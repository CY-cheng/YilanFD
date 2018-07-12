var $$ = Dom7;

Framework7.use(Framework73dPanels);

var app  = new Framework7({
  root: '#app',
  id: 'io.framework7.testapp',
  name: 'Framework7',
  theme: 'auto', 
  view: {

    stackPages:true,
    animateWithJS:true
  },
  data: function () {
    return {};
  },
  methods: {
    helloWorld: function () {
    },
  },
  upscroller:{
    text:'Go down',
  },
  panels3d: {
    enabled: true,
  },
  routes: routes,
});

var mainView = app.views.create('.view-main', {
  url: '/',
  on: {
    pageInit: function () {
      var RoadName=['小東路','中山路','文昌路','城隍街','新民路','新興路','聖後街','舊城北路','其他']
      var Items=['','','','','','','','','',]
      var ItemList=['#item-list1','#item-list2','#item-list3','#item-list4','#item-list5','#item-list6','#item-list7','#item-list8','#item-list9']
      for(var i = 0; i < contentData.length; i++) {
        var itemsdata = `
        <a href="${'/detail/'+ i + '/'}">
        <li>
        <div class="card demo-card-header-pic">
          <div style="background-image:url(img/${contentData[i].images[0]});border-radius: 10px;" class="card-header align-items-flex-end">
            <div class="item-title ItemNameBckground">　${contentData[i].title}　</div>  
          </div>
        </div>
        </li>
        </a>`;
        switch(contentData[i].road){
          case RoadName[0]:Items[0]+=itemsdata;break;
          case RoadName[1]:Items[1]+=itemsdata;break;
          case RoadName[2]:Items[2]+=itemsdata;break;
          case RoadName[3]:Items[3]+=itemsdata;break;
          case RoadName[4]:Items[4]+=itemsdata;break;
          case RoadName[5]:Items[5]+=itemsdata;break;
          case RoadName[6]:Items[6]+=itemsdata;break;
          case RoadName[7]:Items[7]+=itemsdata;break;
          default:Items[8]+=itemsdata;break;
        }
      }
      for(var i=0;i<ItemList.length;i++){
        $$(ItemList[i]).html(Items[i]);
      }
      
    }
  }
});

$$(document).on('page:init', '.page[data-name="detail"]', function (e) {
  var id = mainView.router.currentRoute.params.detailId;
  $$('#title').html(contentData[id].title);
  $$('#text').html(contentData[id].text);
  $$('#address').html('地址：'+contentData[id].address);
  var photos='';
  for(var i=0; i<contentData[id].images.length; i++){
    var photoname = contentData[id].images[i];
    photos += '<div class="swiper-slide"><img src="img/'+photoname+'" style="width:100%;"/></div>';
  };
  $$('#photos').html(photos);
  if(contentData[id].website !== '') {
    var link = '網站連結：<i class="icon material-icons size-14">explore</i>  <a class="link external" href="' +  contentData[id].website +'">'+contentData[id].title+'</a>'; 
    $$('#website').html(link);
  }else{
    $$('#website').html('網站連結：無');
  }
  var onSuccess = function(position) {
    var longitude = contentData[id].long;
    var latitude = contentData[id].lat;
    var latLong = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: latLong,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({
          position: latLong,
          map: map,
          title: contentData[id].title
      }); 
  }
  var onError = function(error){
    alert("the code is " + error.code + ". \n" + "message: " + error.message);
  }
  onSuccess();
});

$$(document).on('page:init', '.page[data-name="ar"]', function (e) {
  myapp.onDeviceReady();
});  

$$(document).on('page:init', '.page[data-name="mapall"]', function (e) {
    var locations = [];
    for(var i = 0; i < contentData.length; i ++ ) {
      locations.push([contentData[i].title, contentData[i].lat, contentData[i].long, i + 1])
    }
    window.map = new google.maps.Map(document.getElementById('map-all'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map
      });
      bounds.extend(marker.position);
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
          }
      })(marker, i));
  }

  map.fitBounds(bounds);

  var listener = google.maps.event.addListener(map, "idle", function() { 
    if (map.getZoom() > 16) map.setZoom(16); 
    google.maps.event.removeListener(listener); 
  });
});


var searchbar = app.searchbar.create({
  el: '.searchbar',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
    }
  }
});



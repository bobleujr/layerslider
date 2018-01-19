var map = L.map('map').setView([46.77878590214894, -71.27707600593567], 11);

// L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
//   attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
//   maxZoom: 16
// }).addTo(map);

L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 25,
    subdomains:['mt0','mt1','mt2','mt3']
  }).addTo(map);

var myData = {
  "layers": [
    {
        "layer":"workspace:layer_gpr_1",
        "url":"http://localhost:8080/geoserver/",
        "visible":"false",
        "description": "Description 1",
        "name":"layer 1",
        "type":1,
        "order":1
    },
    {
        "layer":"workspace:layer_gpr_2",
        "url":"http://localhost:8080/geoserver/",
        "visible":"false",
        "description": "Description 2",
        "name":"layer 2",
        "type":1,
        "order":2
    },
    {
        "layer":"workspace:layer_gpr_3",
        "url":"http://localhost:8080/geoserver/",
        "visible":"false",
        "description": "Description 3",
        "name":"layer 3",
        "type":1,
        "order":3
    }

  ]
};



// IN CASE WE ARE GOING TO USE WMS LAYERS, ETC.

// var myLayers = {};

// $.each(myData.layers, function(i, item){
//     var l;
//     // 2 should be WMS
//     if(item.type == 1){
//       l = new L.TileLayer.WMS(item.url,
//       {
//         layers: item.layer,
//         maxZoom: 20, //configurar
//         format: 'image/png',
//         transparent: true,
//         opacity: 0.7
//       });

//     // 3 should be GWC
//     }else if(item.type == 3){
      
//     // 4 should be BL - Base Layer
//     }else if(item.type == 4){

//     }


//       if (item.visible == 'true'){
//         map.addLayer(l);
//       }

//       //this will remain commented to see what jether wants to do
//       // if (item.legend == 'true')addLayerToLegend(URL_GEOSERVER, item.name, item.layer);
//       //layerCtl.addOverlay(l, item.name);
//       myLayers[item.order] = l;
//   });


// BUT IF WE WANT TO USE IMAGEOVERLAYS 

var loadExampleImage = function(){
  var img_layers = {};
  var img_vector = [
    {
      url:'https://imgur.com/Gh80rJ4.png',
      corners: [
            new L.latLng(46.77878590214894, -71.27707600593567),
            new L.latLng(46.77876569710056, -71.27705857157707),
            new L.latLng(46.77875100251517, -71.27714976668358),
            new L.latLng(46.77873079745371, -71.27713099122047),

            ],
      order: 1
    },
    {
      url:'https://imgur.com/NRW4Yvv.png',
      corners: [
            new L.latLng(46.77878590214894, -71.27707600593567),
            new L.latLng(46.77876569710056, -71.27705857157707),
            new L.latLng(46.77875100251517, -71.27714976668358),
            new L.latLng(46.77873079745371, -71.27713099122047),

            ],
      order: 2
    },
    {
      url:'https://imgur.com/ptXv7cJ.png',
      corners: [
            new L.latLng(46.77878590214894, -71.27707600593567),
            new L.latLng(46.77876569710056, -71.27705857157707),
            new L.latLng(46.77875100251517, -71.27714976668358),
            new L.latLng(46.77873079745371, -71.27713099122047),

            ],
      order: 3
    },
    {
      url:'https://imgur.com/hTV8uQu.png',
      corners: [
            new L.latLng(46.77878590214894, -71.27707600593567),
            new L.latLng(46.77876569710056, -71.27705857157707),
            new L.latLng(46.77875100251517, -71.27714976668358),
            new L.latLng(46.77873079745371, -71.27713099122047),

            ],
      order: 4
    }
  ];

  for(i in img_vector){
    img = new L.DistortableImageOverlay(
        img_vector[i].url, {
          corners: img_vector[i].corners
          }
        ).addTo(map);

        img_layers[img_vector[i].order] = img;

        L.DomEvent.on(img._image, 'load', img.editing.enable, img.editing);

        L.DomEvent.on(img._image, 'load', function() {
      var img = this;
      img.on('edit', function() {alert('teste')}, img);
      }, img);

  }

  return img_layers;

}

var myLayers = loadExampleImage();

var sliderControl = L.control.layerSliderControl({
  position: "topright",
  layers: myLayers
});



map.addControl(sliderControl);

sliderControl.startSlider();


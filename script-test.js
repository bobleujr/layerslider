var map = L.map('map').setView([40.7241745, -73.9841674], 11);

L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  maxZoom: 16
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



// var mylayer = L.geoJson(myData).addTo(map);

var myLayers = {};

$.each(myData.layers, function(i, item){
    var l;
    // 2 should be WMS
    if(item.type == 1){
      l = new L.TileLayer.WMS(item.url,
      {
        layers: item.layer,
        maxZoom: 20, //configurar
        format: 'image/png',
        transparent: true,
        opacity: 0.7
      });

    // 3 should be GWC
    }else if(item.type == 3){
      
    // 4 should be BL - Base Layer
    }else if(item.type == 4){

    }


      if (item.visible == 'true'){
        map.addLayer(l);
      }

      //this will remain commented to see what jether wants to do
      // if (item.legend == 'true')addLayerToLegend(URL_GEOSERVER, item.name, item.layer);
      //layerCtl.addOverlay(l, item.name);
      myLayers[l.order] = l;
  });

var sliderControl = L.control.layerSliderControl({
  position: "topright",
  layers: myLayers
});

map.addControl(sliderControl);

sliderControl.startSlider();
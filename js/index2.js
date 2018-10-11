function switchMapType(map, platform){
    var aerialMapTileService = platform.getMapTileService({
        type: 'aerial'
    });
    terrainMap = aerialMapTileService.createTileLayer(
        'maptile',
        'terrain.day',
        pixelRatio === 1 ? 256 : 512,
        'png8',
        {ppi: pixelRatio === 1 ? undefined : 320}
    );
    map.setBaseLayer(terrainMap);
}


var platform = new H.service.Platform({
    app_id:  '5xPR9QmPDBh2jNew1TsF',
    app_code: 'hg2GwIR-dnjvH6SgYQk-cg',
    useHTTPS: true
});
var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
    tileSize: pixelRatio === 1 ? 256 : 512,
    ppi: pixelRatio === 1 ? undefined : 320
});
var latitude = document.getElementById("latitude").innerText;
var longitude = document.getElementById("longitude").innerText;

var map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map,{
        center: {lat:`${latitude}`, lng:`${longitude}`},
        zoom: 10,
        pixelRatio: pixelRatio
    });



var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


var ui = H.ui.UI.createDefault(map, defaultLayers);


ui.removeControl('mapsettings');

switchMapType(map, platform);

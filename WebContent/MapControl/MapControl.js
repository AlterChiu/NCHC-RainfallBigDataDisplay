class MapControl {

    static mapControl;


    constructor() {
        this.rainfallMap = L.map("rainfallMap").setView([23.6, 121], 7);
        this.rainfallPngLayer = [];

        this.floodMap = L.map("floodMap").setView([23.6, 121], 7);
        this.floodPngLayer = [];
    }


    setViewRainfallMap(maxX, maxY, minX, minY) {
        let imageBound = [
            [minY, minX],
            [maxY, maxX]
        ];
        this.rainfallMap.fitBounds(imageBound, {
            animate: false
        });
    }

    setViewFloodMap(maxX, maxY, minX, minY) {
        let imageBound = [
            [minY, minX],
            [maxY, maxX]
        ];
        this.floodMap.fitBounds(imageBound, {
            animate: false
        });
    }


    /*
        initail map
    */
    initialMap(map) {

        /*
            setting layers
        */
        var streetLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(map);

        var outdoorLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA', {
            maxZoom: 18,
            id: 'mapbox/outdoors-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(map);

        var satelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            id: 'mapbox/satellite-streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(map);






        /*
            setting controler 
         */
        var layers = {
            "Satellite": satelliteLayer,
            "Outdoor": outdoorLayer,
            "Street": streetLayer
        };

        L.control.layers(layers).addTo(map);
    }

    /*
        set image
    */
    addRainfallPNG(imageUrl, maxX, maxY, minX, minY) {
        let imageBound = [
            [minY, minX],
            [maxY, maxX]
        ];
        var oldLayer = this.rainfallPngLayer;

        this.rainfallPngLayer = new L.imageOverlay(imageUrl, imageBound);
        this.rainfallPngLayer.addTo(this.rainfallMap);

        this.removeLayer(oldLayer, this.rainfallMap);
    }

    addFloodPNG(imageUrl, maxX, maxY, minX, minY) {
        let imageBound = [
            [minY, minX],
            [maxY, maxX]
        ];
        var oldLayer = this.floodPngLayer;
        this.removeLayer(oldLayer, this.floodMap);

        this.floodPngLayer = new L.imageOverlay(imageUrl, imageBound);
        this.floodPngLayer.addTo(this.floodMap);

        
    }

    removeLayer(layer, map) {
        try {
            setTimeout(function () {
                map.removeLayer(layer);
            }, 5)
        } catch (e) {}
    }




    /*
        prevent for stack exceed
    */
    disableDragging() {
        this.rainfallMap.dragging.disable();
        this.floodMap.dragging.disable();
    }

    enableDragging() {
        this.rainfallMap.dragging.enable();
        this.floodMap.dragging.enable();
    }
}

MapControl.mapControl = new MapControl();

var initialMap = function () {
    // initial the map
    MapControl.mapControl.initialMap(MapControl.mapControl.floodMap);
    MapControl.mapControl.initialMap(MapControl.mapControl.rainfallMap);

    MapControl.mapControl.rainfallMap.sync(MapControl.mapControl.floodMap);
    MapControl.mapControl.floodMap.sync(MapControl.mapControl.rainfallMap);
}
initialMap();
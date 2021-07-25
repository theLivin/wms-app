/* eslint-disable */
import { onMounted, ref } from "vue";

import Point from "ol/geom/Point";
import { Map, Feature, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { TileWMS, Vector as VectorSource, OSM, TileJSON } from "ol/source";
import { Modify } from "ol/interaction";
import { Icon, Style } from "ol/style";

export function useOpenLayers(geoMap, olMap) {
  const iconFeature = ref(null);

  iconFeature.value = new Feature({
    geometry: new Point([0, 0]),
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 33],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: "http://maps.google.com/mapfiles/ms/icons/red.png",
    }),
  });

  iconFeature.value.setStyle(iconStyle);

  const vectorSource = new VectorSource({
    features: [iconFeature.value],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const layers = [
    new TileLayer({
      source: new OSM(),
      // source: new TileJSON({
      //   url: "https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1",
      //   crossOrigin: "",
      // }),
    }),
    new TileLayer({
      source: new TileWMS({
        url: "http://localhost:8090/geoserver/wmsproject/wms",
        params: { LAYERS: "wmsproject:countriesdbpedia", TILED: true },
        serverType: "geoserver",
        transition: 0,
      }),
    }),
    vectorLayer,
  ];

  /*
  // Draggable marker  
  const modify = new Modify({
    hitDetection: vectorLayer,
    source: vectorSource,
  });
  modify.on(["modifystart", "modifyend"], function(evt) {
    geoMap.value.style.cursor =
      evt.type === "modifystart" ? "grabbing" : "pointer";
  });

  const overlaySource = modify.getOverlay().getSource();
  overlaySource.on(["addfeature", "removefeature"], function(evt) {
    geoMap.value.style.cursor = evt.type === "addfeature" ? "pointer" : "";
  });
  */

  onMounted(() => {
    olMap.value = new Map({
      layers: layers,
      target: geoMap.value,
      view: new View({
        center: [-10997148, 4569099],
        zoom: 7,
      }),
    });

    /*
    // Draggable marker -- Cont'd  
    olMap.value.addInteraction(modify);
    */
  });

  return { iconFeature };
}

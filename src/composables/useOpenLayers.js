import { ref } from "vue";

import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { TileWMS, Vector as VectorSource, OSM, TileJSON } from "ol/source";
import { Icon, Style } from "ol/style";

export function useOpenLayers() {
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

  const layers = [
    new TileLayer({
      source: new OSM(),
    }), // osm layer
    new TileLayer({
      source: new TileJSON({
        url: "https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1",
        crossOrigin: "",
      }),
    }), // mapquest layer
    new TileLayer({
      source: new TileWMS({
        url: "http://localhost:8090/geoserver/wmsproject/wms",
        params: { LAYERS: "wmsproject:countriesdbpedia", TILED: true },
        serverType: "geoserver",
        transition: 0,
      }),
    }), // wms layer
    new VectorLayer({
      source: new VectorSource({
        features: [iconFeature.value],
      }),
    }), // marker icon layer
  ];

  return { iconFeature, layers };
}

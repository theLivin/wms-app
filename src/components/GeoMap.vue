<template>
  <h1>
    Your position: Longitude:
    {{ currPos.lng }}, Latitude: {{ currPos.lat }}
  </h1>
  <label for="pet-select">Choose a pet:</label>

  <select name="pets" id="pet-select" v-model="selected" @change="onSelect">
    <option value="">all layers</option>
    <option value="wms">World Map via WMS</option>
    <option value="gps">GPS Data</option>
  </select>

  <h3>you selected {{ selected }}</h3>
  <div ref="geoMap" style="width: 100%; height: 100%"></div>
</template>

<script>
import { onMounted, computed, ref, watch } from "vue";
import { useGeolocation } from "@/composables/useGeolocation.js";
import { useOpenLayers } from "@/composables/useOpenLayers.js";

import Point from "ol/geom/Point";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import { Group, Tile } from "ol/layer";
import { OSM, TileJSON } from "ol/source";

export default {
  name: "GeoMap",

  setup() {
    const geoMap = ref(null);
    const olMap = ref(null);
    const selected = ref("");

    const { coords } = useGeolocation();
    const {
      iconFeature,
      layers,
      // , modify
    } = useOpenLayers(geoMap);

    const currPos = computed(() => ({
      lng: coords.value.longitude,
      lat: coords.value.latitude,
    }));

    var layersOSM = new Group({
      layers: [
        new Tile({
          source: new OSM(),
        }),
      ],
    });

    var layersMQ = new Group({
      layers: [
        new Tile({
          source: new TileJSON({
            url: "https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1",
            crossOrigin: "",
          }),
        }),
      ],
    });

    const onSelect = () => {
      if (selected.value == "wms") {
        olMap.value.setLayerGroup(layersOSM);
      } else if (selected.value == "gps") {
        olMap.value.setLayerGroup(layersMQ);
      }
    };

    onMounted(() => {
      olMap.value = new Map({
        layers: layers,
        target: geoMap.value,
        view: new View({
          center: [-10997148, 4569099],
          zoom: 7,
        }),
      });

      // olMap.value.addInteraction(modify);
    });

    watch(currPos, () => {
      // Update center and zoom of map
      olMap.value
        .getView()
        .setCenter(fromLonLat([currPos.value.lng, currPos.value.lat]));
      olMap.value.getView().setZoom(14);

      // Update marker location
      iconFeature.value.setGeometry(
        new Point(fromLonLat([currPos.value.lng, currPos.value.lat]))
      );
    });

    return { currPos, geoMap, selected, onSelect };
  },
};
</script>

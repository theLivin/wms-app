<template>
  <h1>
    Your position: Longitude:
    {{ currPos.lng }}, Latitude: {{ currPos.lat }}
  </h1>
  <label for="pet-select">Choose a pet:</label>

  <select name="pets" id="pet-select" v-model="selected" @change="onSelect">
    <option value="osm">osm with gps data</option>
    <option value="wms">world map via wms</option>
    <option value="mq">mapquest</option>
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
import { Group } from "ol/layer";
import "ol/ol.css";

export default {
  name: "GeoMap",

  setup() {
    const geoMap = ref(null);
    const olMap = ref(null);
    const selected = ref("osm");

    const { coords } = useGeolocation();
    const { iconFeature, layers } = useOpenLayers();

    const currPos = computed(() => ({
      lng: coords.value.longitude,
      lat: coords.value.latitude,
    }));

    // layer groups
    var layersOSM = new Group({
      layers: [layers[0], layers[3]],
    });

    var layersWMS = new Group({
      layers: [layers[2]],
    });

    var layersMQ = new Group({
      layers: [layers[1]],
    });

    const onSelect = () => {
      if (selected.value == "wms") {
        olMap.value.setLayerGroup(layersWMS);
      } else if (selected.value == "osm") {
        olMap.value.setLayerGroup(layersOSM);
      } else {
        olMap.value.setLayerGroup(layersMQ);
      }
      olMap.value.getView().setZoom(4);
    };

    onMounted(() => {
      olMap.value = new Map({
        layers: layersOSM,
        target: geoMap.value,
        view: new View({
          center: [-10997148, 4569099],
          zoom: 7,
        }),
      });
    });

    watch(currPos, () => {
      // location update
      olMap.value
        .getView()
        .setCenter(fromLonLat([currPos.value.lng, currPos.value.lat]));
      olMap.value.getView().setZoom(14);

      iconFeature.value.setGeometry(
        new Point(fromLonLat([currPos.value.lng, currPos.value.lat]))
      );
    });

    return { currPos, geoMap, selected, onSelect };
  },
};
</script>

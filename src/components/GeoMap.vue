<template>
  <h1>
    Your position: Longitude:
    {{ currPos.lng }}, Latitude: {{ currPos.lat }}
  </h1>
  <div ref="geoMap" style="width: 100%; height: 100%"></div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useGeolocation } from "@/composables/useGeolocation.js";
import { useOpenLayers } from "@/composables/useOpenLayers.js";

import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

export default {
  name: "GeoMap",

  setup() {
    const geoMap = ref(null);
    const map = ref(null);

    const { coords } = useGeolocation();
    const { iconFeature } = useOpenLayers(geoMap, map);

    const currPos = computed(() => ({
      lng: coords.value.longitude,
      lat: coords.value.latitude,
    }));

    watch(currPos, () => {
      map.value
        .getView()
        .setCenter(fromLonLat([currPos.value.lng, currPos.value.lat]));
      map.value.getView().setZoom(14);

      iconFeature.value.setGeometry(
        new Point(fromLonLat([currPos.value.lng, currPos.value.lat]))
      );
    });

    return { currPos, geoMap };
  },
};
</script>

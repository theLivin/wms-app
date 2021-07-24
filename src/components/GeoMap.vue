<template>
  <h1>
    Your position: Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
    {{ currPos.lng.toFixed(2) }}
  </h1>
</template>

<script>
import { computed } from "vue";
import { useGeolocation } from "@/composables/useGeolocation.js";

export default {
  name: "GeoMap",

  setup() {
    const { coords } = useGeolocation();

    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));

    return { currPos };
  },
};
</script>

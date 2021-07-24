<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <a
    style="cursor:pointer"
    :style="{ display: installBtn }"
    @click="installer()"
  >
    <h1>Install!</h1>
  </a>

  <GeoMap />
</template>

<script>
import { pwaInstaller } from "./composables/pwaInstaller.js";
import GeoMap from "./components/GeoMap.vue";

export default {
  name: "App",

  components: {
    GeoMap,
  },

  setup() {
    const { installer, installBtn } = pwaInstaller;

    return { installer, installBtn };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

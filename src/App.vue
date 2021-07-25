<template>
  <div style="width: 100%; height: 100vh">
    <nav
      class="navbar navbar-light"
      style="background-color: #e3f2fd;"
      :style="{ display: installBtn }"
    >
      <div class="container-fluid justify-content-end">
        <button class="btn btn-primary" @click="installer()">
          Install!
        </button>
      </div>
    </nav>

    <div style="width: 100%; height:100%;">
      <GeoMap />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import GeoMap from "./components/GeoMap.vue";

export default {
  name: "App",

  components: {
    GeoMap,
  },

  setup() {
    let installPrompt = null;
    let installBtn = ref("none");

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      installPrompt = e;
      installBtn.value = "block";
    });

    const installer = () => {
      installBtn.value = "none";
      installPrompt.prompt();
      installPrompt.userChoice.then((result) => {
        if (result.outcome === "accepted") {
          console.log("Install accepted!");
        } else {
          console.log("Install denied!");
        }
      });
    };

    return { installer, installBtn };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

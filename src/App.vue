<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <a
    style="cursor:pointer"
    :style="{ display: installBtn }"
    @click="installer()"
  >
    <h1>Install!</h1>
  </a>

  <HelloWorld msg="Welcome to Your Vue 3 PWA App" />
</template>

<script>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  setup() {
    let installPrompt = null;
    let installBtn = ref("none");

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      installPrompt = e;
      installBtn.value = "block";
    });

    let installer = () => {
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

    return { installer };
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

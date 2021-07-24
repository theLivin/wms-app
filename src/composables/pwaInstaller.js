import { ref } from "vue";

export function pwaInstaller() {
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

  return { installer, installBtn };
}

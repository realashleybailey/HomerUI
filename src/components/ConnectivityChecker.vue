<template>
  <div v-if="offline" class="offline-message">
    <i class="far fa-dizzy"></i>
    <h1>
      You're offline friend.
      <span @click="checkOffline"> <i class="fas fa-redo-alt"></i></span>
    </h1>
  </div>
</template>

<script>
export default {
  name: "ConnectivityChecker",
  data: function () {
    return {
      offline: false,
    };
  },
  created: async function () {
    // if (/t=\d+/.test(window.location.href)) {
    //   window.history.replaceState({}, document.title, window.location.pathname);
    // }
    let that = this;

    const urlPath = window.location.pathname.replace(/\/+$/, "");
    const aliveCheckUrl = `${window.location.origin}${urlPath}/index.html?t=${new Date().valueOf()}`;

    const headers = {
      method: "HEAD",
      cache: "no-store",
      redirect: "manual",
    }

    const promise = fetch(aliveCheckUrl, headers)

    promise.then(function (response) {
      if ((response.type === "opaqueredirect" && !response.ok) || [401, 403].indexOf(response.status) != -1) {
        window.location.href = aliveCheckUrl;
      }
    })

    promise.catch(function (error) {
      console.log("BIG ASS FUCKING ERROR DONT MISS ME");
      that.offline = true;
      that.$emit("network-status-update", that.offline);
    })

    window.addEventListener("visibilitychange", function () {
      if (document.visibilityState == "visible") {
        console.log("visible");
      }
    }, false);

    window.addEventListener("online", function (ev) {
      that.emitOffline(false)
    }, false);

    window.addEventListener("offline", function (ev) {
      that.emitOffline(true)
    }, false);

  },
  methods: {
    emitOffline(offline) {

      console.log(`Your are currently ${offline ? "offline" : "online"}`);

      this.$emit("network-status-update", offline);
      this.offline = offline;
    },
    checkOffline: async function () {

      if (!navigator.onLine) {
        this.offline = true;
        return;
      }

      // extra check to make sure we're not offline
      let that = this;

      const urlPath = window.location.pathname.replace(/\/+$/, "");
      const aliveCheckUrl = `${window.location.origin}${urlPath}/index.html?t=${new Date().valueOf()}`;

      const headers = {
        method: "HEAD",
        cache: "no-store",
        redirect: "manual",
      }

      const response = await fetch(aliveCheckUrl, headers)

      if ((response.type === "opaqueredirect" && !response.ok) || [401, 403].indexOf(response.status) != -1) {
        window.location.href = aliveCheckUrl;
      }

      // return fetch(aliveCheckUrl, {
      //   method: "HEAD",
      //   cache: "no-store",
      //   redirect: "manual",
      // })
      //   .then(function (response) {
      //     // opaqueredirect means request has been redirected, to auth provider probably
      //     if (
      //       (response.type === "opaqueredirect" && !response.ok) ||
      //       [401, 403].indexOf(response.status) != -1
      //     ) {
      //       window.location.href = aliveCheckUrl;
      //     }
      //     that.offline = !response.ok;
      //   })
      //   .catch(function () {
      //     that.offline = true;
      //   })
      //   .finally(function () {
      //     that.$emit("network-status-update", that.offline);
      //   });
    },
  },
};
</script>

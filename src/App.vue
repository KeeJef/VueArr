<template>
    <div class="connectHeader">
      <button
        @mouseover="hover = true"
        @mouseleave="hover = false"
        @mousedown="arconnect"
        :class="{ active: hover }"
        type="button"
        class="arconnectButton"
      >
        {{arconnectStatus}} 
        <span v-if="!walletConnected">💵</span>
        <span v-if="walletConnected">🟢</span>
      </button>
    </div>
    <div class="titleImage">
      <a href="."><img class="logoSize" src="./assets/nav-logo.png" /></a>
    </div>
    <div class="recentTorrents">
      <strong>Search Torrents</strong> |
      <a href="." title="Recent Torrents"
        >Recent&nbsp;Torrents</a
      >
    </div>
    <searchComp />
    <uploadTorrentComp :walletConnected="walletConnected" />
    <tableComp />
</template>

<script>
import tableComp from "./components/tableComp.vue";
import uploadTorrentComp from "./components/uploadTorrentComp.vue";
import searchComp from "./components/searchComp.vue";

export default {
  name: "App",
  components: {
    tableComp,
    uploadTorrentComp,
    searchComp,
  },
  data() {
    return {
      opened: false,
      hover: false,
      walletConnected: null,
      arconnectStatus: "Arconnect"
    };
  },
  methods: {
    arconnect: async function () {
      try {
        await window.arweaveWallet.connect(
          ["ACCESS_ADDRESS", "SIGN_TRANSACTION", "DISPATCH"],
          {
            name: "Arr",
          }
        );
        this.walletConnected = true;
      } catch (error) {
        console.log(error);
        this.arconnectStatus = "Arconnect extension not found"
        this.walletConnected = false;
      }
    },
  },
};
</script>

<style>
.titleImage {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  text-align: center;
}

.recentTorrents {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  text-align: center;
  padding-bottom: 30px;
}
.arconnectButton {
  margin: 2px;
  color: #444;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 15px;
  cursor: pointer;
  background-color: #eee;
  display: block;
  margin-left: auto;
  margin-right: 0;
}
.connectHeader {
  margin: 0 auto;
  max-width: 1200px;
  text-align: center;
  width: 80%;
}
.active {
  background: #ccc;
}

@media screen and (max-width: 700px) {
  .logoSize {
    width: 50%;
    min-width: 200px;
  }
  .connectHeader {
    width: 100%;
    padding-bottom: 10px;
  }
}
</style>

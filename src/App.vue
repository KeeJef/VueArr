<template>
  <!-- Make sure we provide an option for darkmode logo -->
  <div class="connectHeader">
    <button
      @mouseover="hover = true"
      @mouseleave="hover = false"
      @mousedown="arconnect"
      :class="{ active: hover }"
      type="button"
      class="arconnectButton"
    >
      Arconnect 💵
    </button>
    <button class="arconnectButton" v-if="walletConnected" >🟢</button>
  </div>
  <div class="titleImage">
    <a href=""><img class="logoSize" src="./assets/nav-logo.png" /></a>
  </div>
  <div class="recentTorrents">
    <strong>Search Torrents</strong> |
    <a href="/search.php?q=top100:recent" title="Recent Torrents"
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
      walletConnected: false
    };
  },
  methods: {
    arconnect: async function () {
      try {
        await window.arweaveWallet.connect(['ACCESS_ADDRESS',"SIGN_TRANSACTION",'DISPATCH'], {
          name: "Arr"
        });
        this.walletConnected = true
      } catch (error) {
        console.log(error);
         this.walletConnected = false
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
}
.connectHeader {
  text-align: right;
  width: 90%;
}
.active {
  background: #ccc;
}
</style>

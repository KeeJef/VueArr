<template>
<!-- Make sure we provide an option for darkmode logo -->
  <div class="titleImage">
    <a href=""><img class="logoSize" src="./assets/nav-logo.png" /></a>
  </div>
  <div class="recentTorrents">
    <strong>Search Torrents</strong> |
    <a href="/search.php?q=top100:recent" title="Recent Torrents"
      >Recent&nbsp;Torrents</a
    >
  </div>
  <searchComp/>
  <uploadTorrentComp />
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
  async mounted(){
    try {
      //console.log(window.arweaveWallet)
      await window.arweaveWallet.connect(["ACCESS_PUBLIC_KEY"])
    } catch (error) {
      console.log(error)
    }
    
    
  }
};
</script>

<style>
.titleImage {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  text-align: center;
}
.recentTorrents{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    text-align: center;
    padding-bottom: 30px;
}
</style>

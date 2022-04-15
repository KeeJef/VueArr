<template>
  <tr>
    <td>{{ contentType }}</td>
    <td>{{ title }}</td>
    <td>{{ dateUploaded }}</td>
    <td>
      <span class="magnetSpan"> <a v-bind:href="magnetLink">🧲</a></span>
    </td>
    <td>{{seeders}}</td>
    <td>{{leechers}}</td>
  </tr>
</template>

<script>
import {getSeedersAndLeechers} from '../composables/arweaveFunctions.js'

export default {
  name: "TorrentComp",
  props: {
    contentType: String,
    title: String,
    dateUploaded: String,
    magnetLink: String,
  },
  data(){
    return{
      seeders: "",
      leechers: ""
    }
  },
  async mounted () {

    try {
      var seedLeechData = await getSeedersAndLeechers(btoa(this.magnetLink))
      this.seeders = await seedLeechData.seeds 
      this.leechers = await seedLeechData.leechers
    } catch (error) {
      console.log(error)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
table {
  border-collapse: collapse;
  background-color: #f2f2f2;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>

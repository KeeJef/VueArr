<template>
  <div class="loadedTorrentBox">
    <table id="torrentTable">
      <tr>
        <th>Category</th>
        <th>Title</th>
        <th>Uploaded Date</th>
        <th>Link</th>
        <th>Seeders</th>
        <th>Leachers</th>
      </tr>
      <torrentComp
        contentType="Application"
        title="SUSE 10.1 BETA1 OSS DV .iso"
        dateUploaded="01/02/2021"
        seeders="5"
        leechers="10"
        magnetLink="magnet:?xt=urn:btih:186BEB2F74B525685E7EF7543F8696E7F968276A&amp;dn=SUSE%2010.1%20BETA1%20OSS%20DVD%20.iso&amp;tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&amp;tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&amp;tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce"
      />
    </table>
  </div>
</template>

<script>
import { getRecentTxs } from '../composables/arweaveFunctions.js'
import torrentComp from "./torrentComp.vue";

export default {
  name: "TorrentComp ",
  props: {
    contentType: String,
    title: String,
    dateUploaded: String,
    magnetLink: String,
    seeders: String,
    leechers: String,
  },
  data() {
    return {
      response: Object,
    };
  },
  components: {
    torrentComp,
  },

  async mounted() {

    try {
      console.log(await getRecentTxs())
    } catch (error) {
      console.log(error)
    }

    
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.loadedTorrentBox {
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#torrentTable {
  width: 80%;
  border-collapse: collapse;
}

#torrentTable td,
#torrentTable th {
  border: 1px solid #ddd;
  padding: 8px;
}

#torrentTable tr:nth-child(even) {
  background-color: #f2f2f2;
}

#torrentTable tr:hover {
  background-color: #ddd;
}

#torrentTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #005cc8;
  color: white;
}
</style>

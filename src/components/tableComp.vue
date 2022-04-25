<template>
<div v-if="loading" class="loadingBar" >Loading recent torrents</div>
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
        v-for="arweaveData in store.arweaveDataArray"
        :key="arweaveData.id"
        :contentType="arweaveData.contentType"
        :title="arweaveData.title"
        :dateUploaded="arweaveData.dateUploaded"
        :magnetLink="arweaveData.magnetLink"
      />
    </table>
  </div>
</template>

<script>
import {
  getRecentTxIds,
  getTxFromId,
} from "../composables/arweaveFunctions.js";
import torrentComp from "./torrentComp.vue";
import { reactive } from 'vue'

export const store = reactive({
  arweaveDataArray: [],
})

export default {
  name: "TableComp ",
  data() {
    return {
      store,
      loading: true,
    };
  },
  components: {
    torrentComp,
  },
  methods: {},

  async mounted() {
    try {
      var txidArray = await getRecentTxIds();
    } catch (error) {
      console.log(error);
    }

    for (let index = 0; index < txidArray.length; index++) {
      const element = txidArray[index];

      try {
        let txData = await getTxFromId(element);
        store.arweaveDataArray.push({
          id: index,
          magnetLink: txData[0],
          title: txData[1],
          contentType: txData[2],
          dateUploaded: txData[3],
        });
      } catch (error) {
        console.log(error);
      }
    }
    this.loading = false;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.loadingBar{
  text-align: center;
  font-size: 1.5em;
}

    .loadingBar::after {
      display: inline-block;
      animation: dotty steps(1,end) 1s infinite;
      content: '';
    }
    
    @keyframes dotty {
        0%   { content: ''; }
        25%  { content: '.'; }
        50%  { content: '..'; }
        75%  { content: '...'; }
        100% { content: ''; }
    }

.loadedTorrentBox {
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#torrentTable {
  width: 80%;
  border-collapse: collapse;
  max-width: 1200px;
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

<template>
  <div v-if="loading" class="loadingBar">Loading recent torrents</div>
  <div class="loadedTorrentBox">
    <table id="torrentTable">
      <tr>
        <th id="category">{{ category }}</th>
        <th>{{ title }}</th>
        <th id="date">{{ dateUploaded }}</th>
        <th>{{ magnetLink }}</th>
        <th>{{ seeders }}</th>
        <th>{{ leechers }}</th>
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
import { reactive } from "vue";

export const store = reactive({
  arweaveDataArray: [],
});

export default {
  name: "TableComp ",
  data() {
    return {
      store,
      loading: true,
      category: "Category",
      title: "Title",
      dateUploaded: "Date Uploaded",
      magnetLink: "Link",
      seeders: "Seeders",
      leechers: "Leechers",
      windowWidth: 0,
    };
  },
  components: {
    torrentComp,
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      //shorten titles if viewport too small
      if (window.innerWidth < 565) {
        this.category = "Type";
        this.title = "Title";
        this.dateUploaded = "Date";
        this.magnetLink = "Link";
        this.seeders = "Seed";
        this.leechers = "Leech";
      }
    },
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },

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
.loadingBar {
  text-align: center;
  font-size: 1.5em;
}

.loadingBar::after {
  display: inline-block;
  animation: dotty steps(1, end) 1s infinite;
  content: "";
}

@keyframes dotty {
  0% {
    content: "";
  }
  25% {
    content: ".";
  }
  50% {
    content: "..";
  }
  75% {
    content: "...";
  }
  100% {
    content: "";
  }
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
  word-wrap: break-word;
}

#torrentTable tr:nth-child(even) {
  background-color: #f2f2f2;
}

#torrentTable tr {
  background-color: #e2e2e2;
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

@media screen and (max-width: 700px) {
  #torrentTable {
    width: 95%;
  }
  .loadedTorrentBox{
    font-size: 0.85em;
  }
}
@media screen and (max-width: 565px) {
  #torrentTable td:nth-child(1){
    display: none;
  }
  #category {
    display: none;
  }
}
@media screen and (max-width: 340px) {
  #torrentTable td:nth-child(3){
    display: none;
  }
  #date {
    display: none;
  }
}
</style>

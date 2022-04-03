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
    <torrentItem />
  </table>
  </div>
</template>

<script>
import torrentItem from "./components/torrentItem.vue";

export default {
  name: "App",
  components: {
    torrentItem,
  },
};
</script>

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
        background-color: #005CC8;
        color: white;
    }
</style>

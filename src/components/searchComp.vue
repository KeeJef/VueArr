<template>

    <div class="box">
      <div>
        <input
          class="searchBox"
          placeholder="Search"
          autofocus=""
          required=""
          v-model="searchValue"
        />
      </div>
      <div>
        <button class="searchBoxButton" @click="search">
          {{buttonValue}}
        </button>
      </div>
    </div>

    <!-- Fix this so i can use vmodel -->

    <div class="form-box">

      <span class="form-box"
        ><label><input type="checkbox" value="All" v-model="checkboxContentType"/>All</label></span
      >
      <span class="form-box"
        ><label><input type="checkbox" value="Audio" v-model="checkboxContentType"/>Audio</label></span
      >
      <span class="form-box"
        ><label><input type="checkbox" value="Video" v-model="checkboxContentType"/>Video</label></span
      >
      <span class="form-box"
        ><label><input type="checkbox" value="Application" v-model="checkboxContentType"/>Applications</label></span
      >
      <span class="form-box"
        ><label><input type="checkbox" value="Games" v-model="checkboxContentType"/>Games</label></span
      >
      <span class="form-box"
        ><label><input type="checkbox" value="Other" v-model="checkboxContentType"/>Other</label></span
      >
    </div>
    
</template>

<script>
import { searchTx, getTxFromId } from "../composables/arweaveFunctions.js";
import { store } from "./tableComp.vue";

export default {
  name: "SearchComp",
  props: {},
  data() {
    return {
      searchValue: "",
      store,
      buttonValue : "Search",
      checkboxContentType: ["All"]
    };
  },
  methods: {
    search: async function () {
      this.buttonValue = "Searching..."
      let txArray = [];
      if (this.searchValue) {
        try {
          var txidArray = await searchTx(this.searchValue);
        } catch (error) {
          console.log(error);
        }
        //loop through txidArray and get tx from each txid
        for (let i = 0; i < txidArray.length; i++) {
          let txData = await getTxFromId(txidArray[i]);

          if (this.checkboxContentType.includes("All") || this.checkboxContentType.includes(txData[2])) {
          txArray.push({
            id: i,
            magnetLink: txData[0],
            title: txData[1],
            contentType: txData[2],
            dateUploaded: txData[3],
          });
          }
        }
        store.arweaveDataArray = txArray;
      }
      this.buttonValue = "Search"
    },
  },
  //I don't know why this was required instead of @keydown.enter in the button
   mounted() {
    window.addEventListener("keypress", (e) => {
      if (e.keyCode === 13) {
        this.search();
      }
    })
    },
};
</script>

<!-- Clean repetitive CSS  -->
<style>
.box {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
}
.searchBoxButton {
  height: 36px;
  margin-left: 5px;
  border-radius: 0 !important;
  border-width: 2px;
  cursor: pointer;
  border-style: inset;
  border-color: grey;
  background-color: white;
}
.searchBox {
  height: 30px;
  border-radius: 0 !important;
  width: 30vw;
  border-width: 2px;
  border-style: inset;
  border-color: grey;
  background-color: white;
}

.form-box {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  text-align: center;
  padding-bottom: 20px;
}
</style>
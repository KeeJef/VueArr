<template>
  <button
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @mousedown="opened = !opened"
    :class="{ active: hover }"
    type="button"
    class="uploadButton"
  >
    Upload Torrent 📁
  </button>
  <br />
  <div v-if="opened" class="content" id="content" style="display: block">
    <div class="formBox">
      <label style="padding-right: 10px" for="Title">Content Title:</label>
      <input
        id="contentTitle"
        class="inputField"
        contenteditable="true"
        v-model="contentTitle"
      />
    </div>

    <div class="formBox">
      <label style="padding-right: 13px" for="Magnet">Magnet Link:</label>
      <input
        id="magnetLink"
        class="inputField"
        contenteditable="true"
        v-model="magnetLink"
      />
    </div>
    <div class="formBox">
      <label style="padding-right: 10px" for="Category"
        >Content Category:
      </label>
      <select
        id="Category"
        name="Category"
        class="multiSelector"
        v-model="contentType"
      >
        <option value="Audio">Audio</option>
        <option value="Video">Video</option>
        <option value="Application">Application</option>
        <option value="Game">Game</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div class="inline-buttons">
      <input type="file" id="file" style="display: none" />
      <button
        id="button"
        name="button"
        value="Upload"
        class="submitButton"
        v-if="walletConnected"
        @click="submitTransaction"
      >
        Submit Transaction ✅
      </button>
      <div class="txInfo" v-if="invalidTxSubmitted">{{ txFailureReason }}</div>
    </div>
  </div>
</template>

<script>
import { validateInfo, generateTx } from "../composables/arweaveFunctions.js";

export default {
  name: "TorrentComp ",
  props: {
    walletConnected: Boolean,
  },
  data() {
    return {
      opened: false,
      hover: false,
      txFailureReason: "",
      invalidTxSubmitted: false,
      contentType: String,
      magnetLink: "",
      contentTitle: "",
    };
  },
  methods: {
    submitTransaction: async function () {
      if (this.magnetLink && this.contentTitle && this.contentType) {
        this.invalidTxSubmitted = false;

        if ((await validateInfo(this.magnetLink)) === true) {

          let unsignedTransaction = await generateTx(this.magnetLink, this.contentTitle, this.contentType);
          console.log(unsignedTransaction);
          let submittedTransaction = await window.arweaveWallet.sign(unsignedTransaction);
          console.log(submittedTransaction);
        
        } else {
          this.invalidTxSubmitted = true;
          this.txFailureReason = "Invalid Magnet link";
        }
      } else {
        console.log("Failure");
        this.invalidTxSubmitted = true;
        this.txFailureReason = "Please fill in all fields";
      }
    },
  },
};
</script>

<!-- Clean repetitive CSS  -->
<style>
.formBox {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}

.content {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  text-align: center;
  padding: 20px;
  width: 50%;
  margin: 0 auto;
  overflow: hidden;
  background-color: #f1f1f1;
  display: block;
}

.inline-buttons {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* text-align: center; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
  padding-bottom: 10px;
}
.inputField {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-user-modify: read-write;
  overflow-wrap: break-word;
  -webkit-line-break: after-white-space;
  display: inline-block;
  white-space: pre-line;
  text-align: left;
  max-width: 65%;
  min-width: 65%;
  max-height: 90px;
  min-height: 30px;
  border-width: 2px;
  border-style: inset;
  border-color: grey;
  border-radius: 0 !important;
  background-color: white;
  overflow: hidden;
}
.multiSelector {
  width: 30%;
  height: 34px;
  border-width: 2px;
  border-style: inset;
  border-color: grey;
  background-color: white;
  border-radius: 0 !important;
}
.submitButton {
  min-height: 34px;
  border-radius: 0 !important;
  border-width: 2px;
  border-style: inset;
  border-color: grey;
  background-color: white;
  cursor: pointer;
}
.uploadButton {
  display: block;
  margin: 0 auto;
  color: #444;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 15px;
  cursor: pointer;
  background-color: #eee;
}
.active {
  background: #ccc;
}
.txInfo {
  padding-top: 5px;
  color: red;
}
</style>

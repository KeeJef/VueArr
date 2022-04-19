<template>
  <button
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @mousedown="opened = !opened"
    :class="{ active: hover }"
    class="uploadButton"
  >
    Upload Torrent 📁
  </button>
  <br />
  <div v-if="opened" class="content">
    <div class="formBox">
      <label style="padding-right: 10px">Content Title:</label>
      <input
        class="inputField"
        contenteditable="true"
        v-model="contentTitle"
      />
    </div>

    <div class="formBox">
      <label style="padding-right: 13px">Magnet Link:</label>
      <input
        class="inputField"
        contenteditable="true"
        v-model="magnetLink"
      />
    </div>
    <div class="formBox">
      <label style="padding-right: 10px"
        >Content Category:
      </label>
      <select
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
      <button
        class="submitButton"
        v-if="walletConnected"
        @click="submitTransaction"
      >
        Submit Transaction ✅
      </button><div class="loader"></div>
      <div class="txInfo" v-if="txInfoRequired">{{ txInfo }}</div>
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
      txInfo: "",
      txInfoRequired: false,
      contentType: String,
      magnetLink: "",
      contentTitle: "",
    };
  },
  methods: {
    submitTransaction: async function () {
      if (this.magnetLink && this.contentTitle && this.contentType) {
        this.txInfoRequired = false;

        if ((await validateInfo(this.magnetLink)) === true) {
          let status = await generateTx(
            this.magnetLink,
            this.contentTitle,
            this.contentType
          );
          console.log(status);

          this.txInfoRequired = true;
          this.txInfo = status;
        } else {
          this.txInfoRequired = true;
          this.txInfo = "Invalid Magnet link";
        }
      } else {
        console.log("Failure");
        this.txInfoRequired = true;
        this.txInfo = "Please fill in all fields";
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
  text-align: center;
  width: 100%;
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
  margin-right: 5px;
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
}

.loader {
  display: inline-block;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: solid 4px;
  border-color: #000000 #00000010 #00000010;
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

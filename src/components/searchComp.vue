<template>
  <div class="box">
    <div>
      <input class="searchBox" placeholder="Search" autofocus="" required="" />
    </div>
    <div>
      <button class="searchBoxButton">Search</button>
    </div>
  </div>

  <div class="form-box">
    <span class="form-box"
      ><label><input type="checkbox" />All</label></span
    >
    <span class="form-box"
      ><label><input type="checkbox" />Audio</label></span
    >
    <span class="form-box"
      ><label><input type="checkbox" />Video</label></span
    >
    <span class="form-box"
      ><label><input type="checkbox" />Applications</label></span
    >
    <span class="form-box"
      ><label><input type="checkbox" />Games</label></span
    >
    <span class="form-box"
      ><label><input type="checkbox" />Other</label></span
    >
  </div>
</template>

<script>
import {} from "../composables/arweaveFunctions.js";

export default {
  name: "SearchComp",
  props: {},
  data() {
    return {};
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
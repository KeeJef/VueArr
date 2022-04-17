<template>
  <form class="searchForm" action="/search.php" name="q">
    <div class="box">
      <div>
        <input
          class="searchBox"
          name="q"
          type="search"
          title="Search"
          placeholder="Search"
          autofocus=""
          required=""
          style="width: 30vw; padding: 4px"
        />
      </div>

      <div>
        <input
          class="searchBoxButton"
          type="submit"
          title="Pirate Search"
          name="search"
          value="Search"
          accesskey="s"
        />
      </div>
    </div>
    <div>
      <span class="form-box"
        ><label title="All" for="all" accesskey="a"
          ><input
            name="all"
            id="all"
            type="checkbox"
            onclick="setAll();"
            checked=""
          />All</label
        ></span
      >
      <span class="form-box"
        ><label title="Audio" for="audio" accesskey="q"
          ><input
            name="audio"
            id="audio"
            type="checkbox"
            onclick="rmAll();"
          />Audio</label
        ></span
      >
      <span class="form-box"
        ><label title="Video" for="video" accesskey="w"
          ><input
            name="video"
            id="video"
            type="checkbox"
            onclick="rmAll();"
          />Video</label
        ></span
      >
      <span class="form-box"
        ><label title="Applications" for="apps" accesskey="e"
          ><input
            name="apps"
            id="apps"
            type="checkbox"
            onclick="rmAll();"
          />Applications</label
        ></span
      >
      <span class="form-box"
        ><label title="Games" for="games" accesskey="r"
          ><input
            name="games"
            id="games"
            type="checkbox"
            onclick="rmAll();"
          />Games</label
        ></span
      >
      <span class="form-box"
        ><label title="Other" for="other" accesskey="y"
          ><input
            name="other"
            id="other"
            type="checkbox"
            onclick="rmAll();"
          />Other</label
        ></span
      >
    </div>
  </form>
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
.searchForm {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  padding-bottom: 20px;
  text-align: center;
}
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
  height: 30px;
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
  padding: 4px;
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
}
</style>
<template lang="html">
  <div class="card-container">
    <div class="header">
      <h2>{{ title }}</h2>
    </div>
    <div class="ui divider"></div>
    <div class="img-container">
      <img class="ui centered medium rounded image" :src="imgSrc" alt="img" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["title", "imgSrc"]
}
</script>

<style>
.card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 1rem 0;
  justify-content: center;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 1.2rem;
}

.img-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

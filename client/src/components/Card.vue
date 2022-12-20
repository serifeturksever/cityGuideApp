<template lang="html">
    <div class="card-container">
        <h2> {{title}}</h2>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['title']
}
</script>

<style>
.card-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 300px;
    height: 156px;
    border: 1px solid transparent;
    border-radius: 24px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    text-align: center;
}
</style>

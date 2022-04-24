<template>
  <div id="app">
    <canvas-3d />
  </div>
</template>

<script>
import canvas3d from './components/canvas3d.vue'

export default {
  name: 'App',
  components: {
    canvas3d
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

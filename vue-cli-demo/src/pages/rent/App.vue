<template>
  <div id="app">
    <home-page></home-page>
  </div>
</template>

<script>
import HomePage from '@rent/components/HomePage'
export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>

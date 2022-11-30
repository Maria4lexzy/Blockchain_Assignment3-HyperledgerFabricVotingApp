<template>
  <div id="app">

    <p><router-link to="/">Home</router-link>&nbsp;
      <!-- <router-link to="/castBallot">Cast Ballot</router-link>&nbsp; -->
      <router-link to="/QueryAll">Query all assets on the ledger</router-link>
    </p>
    <router-link to="/queryWithQueryString">Query assets by Type</router-link>&nbsp;
    <router-link to="/queryByKey">Query asset by Key</router-link>&nbsp;
    <router-link to="/getCurrentStanding">Vote Standings</router-link>&nbsp;

    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #129581;
  margin-top: 60px;

}

.chart-wrapper {
  width: 100%;
  height: 700px;
}

.echarts {
  width: 100%;
  height: 100%;
}

#loader {
  position: fixed;
  padding-top: 250px;
}

.chart-wrapper {
  position: fixed;
  padding-left: 32%;
}

a {
  background-color: #129581;
  color: white;
  padding: 4px 8px;
  text-decoration: none;
  border-radius: 4px;
  transition: all linear 0.4s;
}

button {
  background-color: #129581;
  color: white;
  padding: 4px 8px;
  text-decoration: none;
  border-radius: 4px;
  transition: all linear 0.4s;
  border: none;
}

a:hover {
  background-color: rgba(104, 218, 199, 0.8);
  transform: scale(1.2);
}
</style>

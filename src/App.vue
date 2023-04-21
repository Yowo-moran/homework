<template>
  <div class="all">
    <!-- <login/> -->
    <!-- <apply/>  -->
    <!-- <management/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import login from './components/login.vue';
// import apply from './pages/apply.vue';
// import management from './pages/management.vue';
export default {
  name: 'App',
  components: {
    // login
    // apply
    // management
  }
}
</script>

<style>
* {
  margin: 0px;
}
html,body{
  height: 100%;
}

/* .all {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
} */
</style>
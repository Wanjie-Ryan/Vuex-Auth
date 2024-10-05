<!-- src/components/NotFound.vue -->
<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <router-link to="/">Go to Homepage</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundComponent",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 20px;
}
</style>

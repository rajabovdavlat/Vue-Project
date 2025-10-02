<script setup lang="ts">
import AccountsView from './views/AccountsView.vue'
</script>

<template>
  <div class="app">
    <h1>Управление учетными записями</h1>
    <AccountsView />
  </div>
</template>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>

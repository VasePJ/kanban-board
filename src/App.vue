<template>
  <v-app>
    <v-main>
      <KanbanBoard />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import KanbanBoard from './components/KanbanBoard.vue';

</script>
<style scoped>
  v-main {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>
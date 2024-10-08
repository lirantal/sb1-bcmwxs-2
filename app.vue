<template>
  <div class="min-h-screen flex flex-col bg-gray-950">
    <NavigationBar v-if="!isEmbedded" />
    <div class="flex-grow flex items-center justify-center">
      <GameContainer />
    </div>
  </div>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue';
import GameContainer from './components/GameContainer.vue';

const route = useRoute();
const isEmbedded = route.query.embedded !== undefined;
</script>
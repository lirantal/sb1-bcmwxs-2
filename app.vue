<template>
  <div class="min-h-screen flex flex-col bg-gray-950">
    <NavigationBar />
    <div class="flex-grow flex items-center justify-center">
      <GameContainer />
    </div>
  </div>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue';
import GameContainer from './components/GameContainer.vue';
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <NavigationBar v-if="!isEmbedded" />
    <div
      class="flex items-center justify-center"
      :class="{ 'flex-grow': !isEmbedded }"
    >
      <GameContainer />
    </div>
  </div>
</template>

<script setup>
import NavigationBar from "./components/NavigationBar.vue";
import GameContainer from "./components/GameContainer.vue";

const route = useRoute();
const isEmbedded = route.query.embedded !== undefined;
</script>

<style>
body {
  background: none transparent;
}
</style>

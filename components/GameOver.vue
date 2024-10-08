<template>
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-4">Game Over!</h2>
    <p class="text-xl mb-4">Your score: {{ score }}</p>
    <button
      @click="$emit('restart')"
      class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
    >
      Play Again
    </button>
  </div>
</template>

<script setup>
defineProps({
  score: {
    type: Number,
    required: true
  }
});

defineEmits(['restart']);
</script>
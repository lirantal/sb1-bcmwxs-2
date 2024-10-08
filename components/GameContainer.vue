<template>
  <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
    <h1 class="text-3xl font-bold text-center py-4 bg-purple-900 text-white">Vulnerable or Not?</h1>
    <div class="p-6">
      <div class="mb-4 text-xl font-semibold">Score: {{ score }}</div>
      <template v-if="!isGameOver">
        <CodeSnippet
          v-if="currentSnippet"
          :snippet="currentSnippet"
          @swipe="handleSwipe"
        />
      </template>
      <GameOver
        v-else
        :score="score"
        @restart="restartGame"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CodeSnippet from './CodeSnippet.vue';
import GameOver from './GameOver.vue';

const score = ref(0);
const snippets = ref([]);
const currentSnippetIndex = ref(0);
const isGameOver = ref(false);

const currentSnippet = computed(() => snippets.value[currentSnippetIndex.value]);

onMounted(() => {
  // In a real app, you'd fetch this from an API
  snippets.value = [
    {
      code: `
function login(username, password) {
  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  return db.execute(query);
}
      `,
      isVulnerable: true,
      explanation: "This code is vulnerable to SQL injection attacks."
    },
    {
      code: `
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
      `,
      isVulnerable: false,
      explanation: "This code uses bcrypt for secure password hashing."
    },
    // Add more code snippets here
  ];
});

function handleSwipe(isVulnerable) {
  if (isVulnerable === currentSnippet.value.isVulnerable) {
    score.value++;
  }
  
  if (currentSnippetIndex.value < snippets.value.length - 1) {
    currentSnippetIndex.value++;
  } else {
    isGameOver.value = true;
  }
}

function restartGame() {
  currentSnippetIndex.value = 0;
  score.value = 0;
  isGameOver.value = false;
}
</script>
<template>
  <div
    class="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden"
    :style="{ transform: `translateX(${dragOffset}px)` }"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
    <h1 class="text-3xl font-bold text-center py-4 bg-purple-900 text-white">Vulnerable or Not?</h1>
    <div class="p-6">
      <div class="mb-4 text-xl font-semibold">Score: {{ score }}</div>
      <template v-if="!isGameOver">
        <CodeSnippet
          v-if="currentSnippet"
          :snippet="currentSnippet"
          @userCodeReviewSubmit="handleUserCodeReview"
        />
        <div class="mt-4 text-center" v-if="isDragging">
          {{ dragDirection === 'left' ? 'Vulnerable' : dragDirection === 'right' ? 'Not Vulnerable' : '' }}
        </div>
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

const dragOffset = ref(0);
const isDragging = ref(false);
const dragStartX = ref(0);

const dragDirection = computed(() => {
  if (dragOffset.value < -50) return 'left';
  if (dragOffset.value > 50) return 'right';
  return '';
});

function startDrag(event) {
  isDragging.value = true;
  dragStartX.value = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);
}

function drag(event) {
  if (!isDragging.value) return;
  const currentX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
  dragOffset.value = currentX - dragStartX.value;
}

function endDrag() {
  isDragging.value = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('touchmove', drag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchend', endDrag);

  console.log(dragOffset);
  
  if (dragOffset.value < -200) {
    handleUserCodeReview(true);
  } else if (dragOffset.value > 200) {
    handleUserCodeReview(false);
  }

  dragOffset.value = 0;
}

function handleUserCodeReview(isVulnerable) {
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

<style scoped>
.bg-gray-800 {
  transition: transform 0.3s ease-out;
}
</style>
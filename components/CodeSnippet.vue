<template>
  <div class="relative h-full">
    <div class="absolute inset-y-0 left-0 w-1 bg-red-500"></div>
    <div class="absolute inset-y-0 right-0 w-1 bg-green-500"></div>
    <div
      class="bg-gray-800 p-4 rounded-lg text-white overflow-x-auto h-full mx-2"
      :style="{ transform: `translateX(${dragOffset}px)` }"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <pre><code>{{ snippet.code }}</code></pre>
      <div class="mt-4 flex justify-between">
        <button @click="emitSwipe(true)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Vulnerable
        </button>
        <button @click="emitSwipe(false)" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Not Vulnerable
        </button>
      </div>
      <div class="mt-4 text-center" v-if="isDragging">
        {{ dragDirection === 'left' ? 'Vulnerable' : dragDirection === 'right' ? 'Not Vulnerable' : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  snippet: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['swipe']);

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
  
  if (dragOffset.value < -600) {
    emitSwipe(true);
  } else if (dragOffset.value > 600) {
    emitSwipe(false);
  }

  dragOffset.value = 0;
}

function emitSwipe(isVulnerable) {
  emit('swipe', isVulnerable);
}
</script>

<style scoped>
.bg-gray-800 {
  transition: transform 0.3s ease-out;
}
</style>
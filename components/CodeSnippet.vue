<template>
  <div class="relative h-full">
    <div class="absolute inset-y-0 left-0 w-1 bg-red-500"></div>
    <div class="absolute inset-y-0 right-0 w-1 bg-green-500"></div>
    <div
      class="bg-gray-800 p-4 rounded-lg text-white overflow-x-auto h-full mx-2"
    >
      <pre class="prose text-slate-50"><code>{{ snippet.code }}</code></pre>
      <div class="mt-4 flex justify-between">
        <button @click="$emit('userCodeReviewSubmit', true)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Vulnerable
        </button>
        <button @click="$emit('userCodeReviewSubmit', false)" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
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

const emit = defineEmits(['userCodeReviewSubmit']);
</script>
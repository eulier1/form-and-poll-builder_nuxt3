<script setup lang="ts">
import { usePollsStore } from '~/stores/polls';

const pollsStore = usePollsStore();

const question = ref('');
const options = ref(['', '']);

const addOption = () => {
  options.value.push('');
};

const removeOption = (index: number) => {
  if (options.value.length > 2) {
    options.value.splice(index, 1);
  }
};

const createPoll = () => {
  if (!question.value || options.value.some(opt => !opt)) return;
  
  pollsStore.createPoll(question.value, options.value);
  question.value = '';
  options.value = ['', ''];
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Create a Poll</h2>
    
    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Question</label>
        <input
          v-model="question"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your question"
        >
      </div>
      
      <div class="space-y-4">
        <label class="block text-sm font-medium text-gray-700">Options</label>
        <div v-for="(option, index) in options" :key="index" class="flex gap-2">
          <input
            v-model="options[index]"
            type="text"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :placeholder="`Option ${index + 1}`"
          >
          <button
            v-if="options.length > 2"
            class="px-3 py-2 text-red-600 hover:text-red-800"
            @click="removeOption(index)"
          >
            Remove
          </button>
        </div>
        
        <button
          class="mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
          @click="addOption"
        >
          + Add Option
        </button>
      </div>
      
      <button
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        @click="createPoll"
      >
        Create Poll
      </button>
    </div>
  </div>
</template> 
<script setup lang="ts">
import type { Poll } from '~/types';
import { usePollsStore } from '~/stores/polls';

const props = defineProps<{
  poll: Poll;
}>();

const pollsStore = usePollsStore();
const selectedOption = ref<string | null>(null);

const vote = () => {
  if (!selectedOption.value) return;
  pollsStore.votePoll(props.poll.id, selectedOption.value);
  selectedOption.value = null;
};

const totalVotes = computed(() => {
  return props.poll.options.reduce((sum, option) => sum + option.votes, 0);
});

const getPercentage = (votes: number) => {
  if (totalVotes.value === 0) return 0;
  return Math.round((votes / totalVotes.value) * 100);
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">{{ poll.question }}</h2>
    
    <div class="space-y-4">
      <div v-for="option in poll.options" :key="option.id" class="space-y-2">
        <div class="flex items-center gap-4">
          <input
            :id="option.id"
            v-model="selectedOption"
            type="radio"
            :value="option.id"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500"
          >
          <label :for="option.id" class="flex-1">
            {{ option.text }}
          </label>
          <span class="text-sm text-gray-500">
            {{ option.votes }} votes ({{ getPercentage(option.votes) }}%)
          </span>
        </div>
        
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-blue-600 transition-all duration-300"
            :style="{ width: `${getPercentage(option.votes)}%` }"
          />
        </div>
      </div>
    </div>
    
    <button
      :disabled="!selectedOption"
      class="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="vote"
    >
      Vote
    </button>
  </div>
</template> 
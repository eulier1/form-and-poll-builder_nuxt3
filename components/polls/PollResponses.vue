<script setup lang="ts">
import type { Poll } from '~/types';
import { usePollsStore } from '~/stores/polls';
import PollDisplay from '~/components/polls/PollDisplay.vue';

const props = defineProps<{
  poll: Poll;
}>();

const emit = defineEmits<{
  (e: 'back'): void;
}>();

const pollsStore = usePollsStore();

// Calculate statistics
const totalVotes = computed(() => {
  return props.poll.options.reduce((sum, opt) => sum + opt.votes, 0);
});

const sortedOptions = computed(() => {
  return [...props.poll.options].sort((a, b) => b.votes - a.votes);
});

const getPercentage = (votes: number) => {
  if (totalVotes.value === 0) return 0;
  return Math.round((votes / totalVotes.value) * 100);
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-xl font-semibold text-gray-900">{{ poll.question }}</h3>
        <p class="text-sm text-gray-500">{{ totalVotes }} total votes</p>
      </div>
    </div>

    <!-- Poll Content -->
    <PollDisplay :poll="poll" />

    <!-- Results -->
    <div class="space-y-6">
      <div v-for="option in sortedOptions" :key="option.id" class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-700">{{ option.text }}</span>
          <span class="text-sm text-gray-500">
            {{ option.votes }} votes ({{ getPercentage(option.votes) }}%)
          </span>
        </div>
        <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-blue-600 transition-all duration-300"
            :style="{ width: `${getPercentage(option.votes)}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div class="mt-8 p-4 bg-gray-50 rounded-lg">
      <h4 class="text-sm font-medium text-gray-900 mb-2">Summary</h4>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-500">Total Votes</p>
          <p class="text-lg font-semibold text-gray-900">{{ totalVotes }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Options</p>
          <p class="text-lg font-semibold text-gray-900">{{ poll.options.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template> 
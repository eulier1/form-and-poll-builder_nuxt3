<script setup lang="ts">
import { usePollsStore } from '~/stores/polls';

const pollsStore = usePollsStore();
const activeTab = ref('polls'); // 'polls' | 'responses'
const selectedPoll = ref<string | null>(null);

const toggleCreator = () => {
  activeTab.value = 'create';
};

const viewResponses = (pollId: string) => {
  selectedPoll.value = pollId;
  activeTab.value = 'responses';
};

const backToPolls = () => {
  activeTab.value = 'polls';
  selectedPoll.value = null;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center space-x-4">
            <h1 class="text-3xl font-bold text-gray-900">Polls</h1>
            <div class="flex space-x-2">
              <button
                v-if="activeTab !== 'polls'"
                class="px-4 py-2 text-gray-600 hover:text-gray-900"
                @click="backToPolls"
              >
                ← Back to Polls
              </button>
            </div>
          </div>
          <button
            v-if="activeTab === 'polls'"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            @click="toggleCreator"
          >
            Create Poll
          </button>
        </div>

        <!-- Content -->
        <div class="bg-white rounded-lg shadow">
          <!-- Polls List -->
          <div v-if="activeTab === 'polls'" class="p-6">
            <div v-if="pollsStore.polls.length === 0" class="text-center py-12">
              <p class="text-gray-500">No polls created yet. Create your first poll!</p>
            </div>

            <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="poll in pollsStore.polls"
                :key="poll.id"
                class="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div class="p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ poll.question }}</h3>
                  <p class="text-sm text-gray-500 mb-4">
                    {{ poll.options.length }} options
                  </p>
                  <div class="flex justify-between items-center">
                    <button
                      class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      @click="viewResponses(poll.id)"
                    >
                      View Results
                    </button>
                    <span class="text-sm text-gray-500">
                      {{ poll.options.reduce((sum, opt) => sum + opt.votes, 0) }} votes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Poll Creator -->
          <div v-else-if="activeTab === 'create'" class="p-6">
            <PollsPollCreator @created="backToPolls" />
          </div>

          <!-- Responses View -->
          <div v-else-if="activeTab === 'responses' && selectedPoll" class="p-6">
            <PollsPollResponses
              :poll="pollsStore.getPoll(selectedPoll)"
              @back="backToPolls"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
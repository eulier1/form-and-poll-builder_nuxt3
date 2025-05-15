<script setup lang="ts">
const showCreator = ref(false);

const toggleCreator = () => {
  showCreator.value = !showCreator.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-gray-900">Polls</h1>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            @click="toggleCreator"
          >
            {{ showCreator ? 'Cancel' : 'Create Poll' }}
          </button>
        </div>

        <h1>Under Construction</h1>

      </div>
    </div>
  </div>
</template> 
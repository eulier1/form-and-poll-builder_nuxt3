<template>
  <div class="min-h-screen bg-gray-50">
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <NuxtLink
            to="/polls"
            class="relative block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Polls</h2>
            <p class="text-gray-600">
              Create and respond to single-question polls with multiple choice options.
            </p>
          </NuxtLink>

          <NuxtLink
            to="/forms"
            class="relative block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Forms</h2>
            <p class="text-gray-600">
              Create and respond to forms with multiple question types.
            </p>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template> 
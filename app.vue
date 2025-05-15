<script setup lang="ts">
const navigation = [
  { name: 'Polls', href: '/polls' },
  { name: 'Forms', href: '/forms' }
];
</script>

<template>
  <div>
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            
            <div class="flex-shrink-0 flex items-center">
              <NuxtLink to="/">
                <h1 class="text-xl font-bold text-gray-900">Poll & Form Builder</h1>
              </NuxtLink>
            </div>

            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <NuxtPage />
  </div>
</template>

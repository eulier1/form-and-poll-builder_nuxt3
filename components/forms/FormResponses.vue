<script setup lang="ts">
import type { Form } from '~/types';
import { useFormsStore } from '~/stores/forms';
import FormDisplay from '~/components/forms/FormDisplay.vue';

const props = defineProps<{
  form: Form;
}>();

const emit = defineEmits<{
  (e: 'back'): void;
}>();

const formsStore = useFormsStore();
const responses = computed(() => formsStore.getFormResponses(props.form.id));

// Sorting
const sortBy = ref('submittedAt');
const sortDirection = ref<'asc' | 'desc'>('desc');

const sortedResponses = computed(() => {
  return [...responses.value].sort((a, b) => {
    const aValue = a[sortBy.value];
    const bValue = b[sortBy.value];
    const direction = sortDirection.value === 'asc' ? 1 : -1;
    
    if (sortBy.value === 'submittedAt') {
      return direction * (new Date(aValue).getTime() - new Date(bValue).getTime());
    }
    
    return direction * String(aValue).localeCompare(String(bValue));
  });
});

const toggleSort = (column: string) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortDirection.value = 'desc';
  }
};

// Filtering
const searchQuery = ref('');
const filteredResponses = computed(() => {
  if (!searchQuery.value) return sortedResponses.value;
  
  const query = searchQuery.value.toLowerCase();
  return sortedResponses.value.filter(response => {
    return response.answers.some(answer => 
      String(answer.value).toLowerCase().includes(query)
    );
  });
});

const getQuestionText = (questionId: string) => {
  return props.form.questions.find((q: { id: string; text: string }) => q.id === questionId)?.text || questionId;
};

const getAnswerForQuestion = (response: { answers: { questionId: string; value: string | number }[] }, questionId: string) => {
  return response.answers.find(a => a.questionId === questionId)?.value || '-';
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-xl font-semibold text-gray-900">{{ form.title }}</h3>
        <p class="text-sm text-gray-500">{{ responses.length }} responses</p>
      </div>
    </div>

    <!-- Form Content -->
    <FormDisplay :form="form" />

    <!-- Search -->
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search responses..."
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
    </div>

    <!-- Table -->
    <div v-if="responses.length === 0" class="text-center py-12 text-gray-500">
      No responses yet
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              @click="toggleSort('submittedAt')"
            >
              <div class="flex items-center space-x-1">
                <span>Submitted At</span>
                <span v-if="sortBy === 'submittedAt'" class="text-blue-600">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </div>
            </th>
            <th
              v-for="question in form.questions"
              :key="question.id"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ question.text }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="response in filteredResponses" :key="response.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(response.submittedAt).toLocaleString() }}
            </td>
            <td
              v-for="question in form.questions"
              :key="question.id"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {{ response.answers.find(a => a.questionId === question.id)?.value || '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> 
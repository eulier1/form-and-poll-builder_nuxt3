<script setup lang="ts">
import { useFormsStore } from '~/stores/forms';

const formsStore = useFormsStore();
const activeTab = ref('forms'); // 'forms' | 'responses'
const selectedForm = ref<string | null>(null);

const toggleCreator = () => {
  activeTab.value = 'create';
};

const viewResponses = (formId: string) => {
  selectedForm.value = formId;
  activeTab.value = 'responses';
};

const backToForms = () => {
  activeTab.value = 'forms';
  selectedForm.value = null;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center space-x-4">
            <h1 class="text-3xl font-bold text-gray-900">Forms</h1>
            <div class="flex space-x-2">
              <button
                v-if="activeTab !== 'forms'"
                class="px-4 py-2 text-gray-600 hover:text-gray-900"
                @click="backToForms"
              >
                ← Back to Forms
              </button>
            </div>
          </div>
          <button
            v-if="activeTab === 'forms'"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            @click="toggleCreator"
          >
            Create Form
          </button>
        </div>

        <!-- Content -->
        <div class="bg-white rounded-lg shadow">
          <!-- Forms List -->
          <div v-if="activeTab === 'forms'" class="p-6">
            <div v-if="formsStore.forms.length === 0" class="text-center py-12">
              <p class="text-gray-500">No forms created yet. Create your first form!</p>
            </div>

            <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="form in formsStore.forms"
                :key="form.id"
                class="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div class="p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ form.title }}</h3>
                  <p class="text-sm text-gray-500 mb-4">
                    {{ form.questions.length }} questions
                  </p>
                  <div class="flex justify-between items-center">
                    <button
                      class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      @click="viewResponses(form.id)"
                    >
                      View Responses
                    </button>
                    <span class="text-sm text-gray-500">
                      {{ formsStore.getFormResponses(form.id).length }} responses
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Creator -->
          <div v-else-if="activeTab === 'create'" class="p-6">
            <FormsFormCreator @created="backToForms" />
          </div>

          <!-- Responses View -->
          <div v-else-if="activeTab === 'responses' && selectedForm" class="p-6">
            <FormsFormResponses
              :form="formsStore.getForm(selectedForm)"
              @back="backToForms"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
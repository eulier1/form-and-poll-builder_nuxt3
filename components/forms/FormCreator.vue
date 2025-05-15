<script setup lang="ts">
import type { FormQuestion, QuestionType } from '~/types';
import { useFormsStore } from '~/stores/forms';

const formsStore = useFormsStore();

const title = ref('');
const questions = ref<Omit<FormQuestion, 'id'>[]>([
  {
    type: 'short-answer',
    text: '',
    required: true,
    placeholder: ''
  }
]);

const questionTypes: QuestionType[] = ['short-answer', 'long-answer', 'number', 'radio'];

const addQuestion = () => {
  questions.value.push({
    type: 'short-answer',
    text: '',
    required: true,
    placeholder: ''
  });
};

const removeQuestion = (index: number) => {
  if (questions.value.length > 1) {
    questions.value.splice(index, 1);
  }
};

const addRadioOption = (questionIndex: number) => {
  if (!questions.value[questionIndex].options) {
    questions.value[questionIndex].options = [];
  }
  questions.value[questionIndex].options!.push('');
};

const removeRadioOption = (questionIndex: number, optionIndex: number) => {
  if (questions.value[questionIndex].options!.length > 2) {
    questions.value[questionIndex].options!.splice(optionIndex, 1);
  }
};

const createForm = () => {
  if (!title.value || questions.value.some(q => !q.text)) return;
  
  formsStore.createForm(title.value, questions.value);
  title.value = '';
  questions.value = [{
    type: 'short-answer',
    text: '',
    required: true,
    placeholder: ''
  }];
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Create a Form</h2>
    
    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
        <input
          v-model="title"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter form title"
        >
      </div>
      
      <div class="space-y-6">
        <div v-for="(question, index) in questions" :key="index" class="p-4 border border-gray-200 rounded-lg">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-medium">Question {{ index + 1 }}</h3>
            <button
              v-if="questions.length > 1"
              class="text-red-600 hover:text-red-800"
              @click="removeQuestion(index)"
            >
              Remove
            </button>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
              <input
                v-model="question.text"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter question"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
              <select
                v-model="question.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option v-for="type in questionTypes" :key="type" :value="type">
                  {{ type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
              <input
                v-model="question.placeholder"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter placeholder text"
              >
            </div>
            
            <div class="flex items-center">
              <input
                v-model="question.required"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500"
              >
              <label class="ml-2 text-sm text-gray-700">Required</label>
            </div>
            
            <div v-if="question.type === 'radio'" class="space-y-4">
              <label class="block text-sm font-medium text-gray-700">Options</label>
              <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="flex gap-2">
                <input
                  v-model="question.options![optionIndex]"
                  type="text"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="`Option ${optionIndex + 1}`"
                  @keyup.enter="optionIndex === question.options!.length - 1 ? addRadioOption(index) : null"
                >
                <button
                  v-if="question.options!.length > 2"
                  class="px-3 py-2 text-red-600 hover:text-red-800"
                  @click="removeRadioOption(index, optionIndex)"
                >
                  Remove
                </button>
              </div>
              <button
                class="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                @click="addRadioOption(index)"
              >
                + Add Option
              </button>
            </div>
          </div>
        </div>
        
        <button
          class="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md"
          @click="addQuestion"
        >
          + Add Question
        </button>
      </div>
      
      <button
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        @click="createForm"
      >
        Create Form
      </button>
    </div>
  </div>
</template> 
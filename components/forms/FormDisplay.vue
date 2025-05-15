<script setup lang="ts">
import type { Form, FormQuestion } from '~/types';
import { useFormsStore } from '~/stores/forms';
import BaseInput from '~/components/ui/BaseInput.vue';

const props = defineProps<{
  form: Form;
}>();

const formsStore = useFormsStore();
const answers = ref<Record<string, string | number>>({});
const errors = ref<Record<string, string>>({});

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  props.form.questions.forEach(question => {
    if (question.required && !answers.value[question.id]) {
      errors.value[question.id] = 'This field is required';
      isValid = false;
    }
  });

  return isValid;
};

const submitForm = () => {
  if (!validateForm()) return;

  const formattedAnswers = Object.entries(answers.value).map(([questionId, value]) => ({
    questionId,
    value
  }));

  formsStore.submitFormResponse(props.form.id, formattedAnswers);
  answers.value = {};
  errors.value = {};
};

const getQuestionComponent = (question: FormQuestion) => {
  switch (question.type) {
    case 'short-answer':
      return {
        component: BaseInput,
        props: {
          type: 'text',
          placeholder: question.placeholder
        }
      };
    case 'long-answer':
      return {
        component: BaseInput,
        props: {
          type: 'textarea',
          placeholder: question.placeholder
        }
      };
    case 'number':
      return {
        component: BaseInput,
        props: {
          type: 'number',
          placeholder: question.placeholder
        }
      };
    case 'radio':
      return {
        component: 'div',
        props: {
          class: 'space-y-2'
        }
      };
    default:
      return {
        component: BaseInput,
        props: {
          type: 'text',
          placeholder: question.placeholder
        }
      };
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">{{ form.title }}</h2>
    
    <form class="space-y-6" @submit.prevent="submitForm">
      <div v-for="question in form.questions" :key="question.id" class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          {{ question.text }}
          <span v-if="question.required" class="text-red-500">*</span>
        </label>
        
        <component
          :is="getQuestionComponent(question).component"
          v-if="question.type !== 'radio'"
          v-model="answers[question.id]"
          v-bind="getQuestionComponent(question).props"
          :error="errors[question.id]" />
        
        <div v-else class="space-y-2">
          <div v-for="option in question.options" :key="option" class="flex items-center">
            <input
              :id="`${question.id}-${option}`"
              v-model="answers[question.id]"
              type="radio"
              :value="option"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500"
            >
            <label :for="`${question.id}-${option}`" class="ml-2 text-sm text-gray-700">
              {{ option }}
            </label>
          </div>
          <p v-if="errors[question.id]" class="mt-1 text-sm text-red-600">
            {{ errors[question.id] }}
          </p>
        </div>
      </div>
      
      <button
        type="submit"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  </div>
</template> 
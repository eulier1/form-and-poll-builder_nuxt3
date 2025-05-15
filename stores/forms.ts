import { defineStore } from 'pinia';
import type { Form, FormQuestion, FormResponse } from '~/types';

export const useFormsStore = defineStore('forms', () => {
  const forms = ref<Form[]>([]);
  const responses = ref<FormResponse[]>([]);

  const createForm = (title: string, questions: Omit<FormQuestion, 'id'>[]) => {
    const form: Form = {
      id: crypto.randomUUID(),
      title,
      questions: questions.map(q => ({
        ...q,
        id: crypto.randomUUID()
      })),
      createdAt: new Date()
    };
    forms.value.push(form);
    return form;
  };

  const submitFormResponse = (formId: string, answers: { questionId: string; value: string | number }[]) => {
    const response: FormResponse = {
      id: crypto.randomUUID(),
      formId,
      answers,
      submittedAt: new Date()
    };
    responses.value.push(response);
    return response;
  };

  const getForm = (id: string) => {
    return forms.value.find(form => form.id === id);
  };

  const getFormResponses = (formId: string) => {
    return responses.value.filter(response => response.formId === formId);
  };

  return {
    forms,
    responses,
    createForm,
    submitFormResponse,
    getForm,
    getFormResponses
  };
}); 
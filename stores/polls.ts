import { defineStore } from 'pinia';
import type { Poll, PollOption } from '~/types';

export const usePollsStore = defineStore('polls', () => {
  const polls = ref<Poll[]>([]);

  const createPoll = (question: string, options: string[]) => {
    const poll: Poll = {
      id: crypto.randomUUID(),
      question,
      options: options.map(text => ({
        id: crypto.randomUUID(),
        text,
        votes: 0
      })),
      createdAt: new Date()
    };
    polls.value.push(poll);
    return poll;
  };

  const votePoll = (pollId: string, optionId: string) => {
    const poll = polls.value.find(p => p.id === pollId);
    if (!poll) return;

    const option = poll.options.find(o => o.id === optionId);
    if (!option) return;

    option.votes++;
  };

  const getPoll = (id: string) => {
    return polls.value.find(poll => poll.id === id);
  };

  return {
    polls,
    createPoll,
    votePoll,
    getPoll
  };
}); 
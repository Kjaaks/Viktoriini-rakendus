<template>
  <div class="result-table-container">
    <h2>Viktoriin on lõppenud!</h2>
    <table class="result-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Küsimus</th>
          <th>Õige vastus</th>
          <th>Teie vastus</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in answers" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ entry.question }}</td>
          <td>{{ entry.answer }}</td>
          <td :class="{ correct: entry.correct, incorrect: !entry.correct }">
            {{ entry.userAnswer }}
          </td>
        </tr>
      </tbody>
    </table>

    <p class="score">Teie koondskoor: {{ score }} / {{ total }}</p>
    <p class="message">{{ message }}</p>

    <button @click="$emit('restart')" class="button-details">
      Alusta uuesti
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export interface AnswerEntry {
  question: string;
  answer: string;
  userAnswer: string;
  correct: boolean;
}

export default defineComponent({
  name: 'ResultTable',
  props: {
    answers: {
      type: Array as PropType<AnswerEntry[]>,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    }
  },
  emits: ['restart']
});
</script>

<style scoped>

.result-table-container {
  text-align: center;
  font-size: 1.9rem;
  padding: 20px;
}
.result-table {
  width: 90%;
  margin: 20px auto;
  border-collapse: collapse;
  font-size: 1.1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
}
.result-table th,
.result-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}
.result-table th {
  background-color: #f0f0f0;
}
.result-table td.correct {
  background-color: #d4edda;
  color: #155724;
  font-weight: bold;
}
.result-table td.incorrect {
  background-color: #f8d7da;
  color: #721c24;
  font-weight: bold;
}
.score {
  margin-top: 20px;
  font-weight: bold;
  font-size: 1.5rem;
}
.message {
  font-size: 1.5rem;
  margin-top: 10px;
}
</style>

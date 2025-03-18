<template>
    <div>
      <div v-if="currentQuestion">
        <h2>{{ currentQuestion.question }}</h2>
        <div v-for="(option, index) in currentQuestion.options" :key="index">
          <button @click="answerQuestion(option)">
            {{ option }}
          </button>
        </div>
      </div>
  
      <div v-else>
        <!-- Kuvatakse koondskoor ja isikupärastatud sõnum viktoriini lõpus -->
        <h2>Viktoriin on lõppenud!</h2>
        <table>
          <tr>
            <th>Küsimus</th>
            <th>Õige vastus</th>
            <th>Teie vastus</th>
          </tr>
          <tr v-for="(question, index) in quiz?.questions" :key="index">
            <td>{{ question.question }}</td>
            <td>{{ question.answer }}</td>
            <td>{{ userAnswers[index] }}</td>
          </tr>
        </table>
        <p>Teie koondskoor: {{ score }} / {{ totalQuestions }}</p>
        <p>{{ personalizedMessage }}</p>
  
        <button @click="restartQuiz">Alusta uuesti</button>
      </div>
  
      <!-- Modali kuvamine tagasiside andmiseks, peale igat küsimust -->
      <FeedBackModal 
        :isVisible="isModalVisible"
        :title="modalTitle"
        :message="feedbackMessage"
        @close="closeModal" 
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Quiz } from '~/models/Quiz'; // Importige Quiz klass
  import { Question } from '~/models/Question'; // Importige Question klass
  import FeedBackModal from './FeedBackModal.vue';
  
  export default defineComponent({
    name: 'QuizComponent',
    components: {
      FeedBackModal
    },
    setup() {
      const quiz = ref<Quiz | null>(null);
      const currentQuestion = ref<Question | null>(null);
      const score = ref(0);
      const feedbackMessage = ref(''); 
      const modalTitle = ref('');
      const isModalVisible = ref(false);
      const personalizedMessage = ref('');
      const totalQuestions = ref(0);
      const userAnswers = ref<string[]>([]); 
  
      onMounted(() => {
        startNewQuiz();
      });
  
      const startNewQuiz = () => {
        // Lähtestame kõik väärtused
        quiz.value = new Quiz('Kasutaja');
        score.value = 0;
        userAnswers.value = [];
        totalQuestions.value = quiz.value?.questions.length ?? 0;
        loadNextQuestion();
      };
  
      const loadNextQuestion = () => {
        if (quiz.value) {  
          const question = quiz.value.nextQuestion(); 
          if (question) {
            currentQuestion.value = question;
          } else {
            currentQuestion.value = null;
            personalizedMessage.value = score.value === totalQuestions.value ? 'Täiuslik sooritus!' : 'Hea töö!';
          }
        }
      };
  
      const answerQuestion = (selectedOption: string) => {
        if (currentQuestion.value && quiz.value) {  
          const isCorrect = quiz.value.checkAnswer(selectedOption); 
          userAnswers.value.push(selectedOption); 
  
          // Modal tagasiside kuvamine
          if (isCorrect) {
            modalTitle.value = 'Õige vastus!';
            feedbackMessage.value = 'Sa vastasid õigesti!';
            score.value++;
          } else {
            modalTitle.value = 'Vale vastus!';
            feedbackMessage.value = `Vale vastus! Õige vastus on: ${currentQuestion.value.answer}`;
          }
  
          isModalVisible.value = true;
        }
      };
  
      const closeModal = () => {
        isModalVisible.value = false; 
        loadNextQuestion(); 
      };
  
      const restartQuiz = () => {
        startNewQuiz();
        isModalVisible.value = false;
      };
  
      return {
        currentQuestion,
        score,
        totalQuestions,
        feedbackMessage,
        personalizedMessage,
        userAnswers,
        quiz, 
        answerQuestion,
        modalTitle,
        isModalVisible,
        closeModal,
        restartQuiz
      };
    }
  });
  </script>
  
  <style scoped>
  button {
    margin: 10px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  
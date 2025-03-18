<template>
  <div class="quiz-container">
    <div v-if="currentQuestion">
      <h2 class="question">{{ currentQuestion.question }}</h2>
      <div class="options-container">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          @click="answerQuestion(option)"
          class="button-details"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <div v-else>
      <ResultTable
        :answers="userAnswers"
        :score="score"
        :total="totalQuestions"
        :message="personalizedMessage"
        @restart="restartQuiz"
      />
    </div>

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
import { QuizService } from '~/services/QuizService';
import { QuestionService } from '~/services/QuestionService';
import FeedBackModal from './FeedBackModal.vue';
import ResultTable from './ResultTable.vue';
import type { AnswerEntry } from './ResultTable.vue';

import { Question } from '~/models/Question';

export default defineComponent({
  name: 'QuizComponent',
  components: {
    FeedBackModal,
    ResultTable
  },
  setup() {
    const questionService = new QuestionService();
    const quizService = new QuizService(questionService);

    const currentQuestion = ref<Question | null>(null);
    const score = ref(0);
    const feedbackMessage = ref('');
    const modalTitle = ref('');
    const isModalVisible = ref(false);
    const personalizedMessage = ref('');
    const totalQuestions = ref(0);

    const userAnswers = ref<AnswerEntry[]>([]);

    onMounted(() => {
      totalQuestions.value = quizService.getQuestions().length;
      currentQuestion.value = quizService.startQuiz();
    });

    const loadNextQuestion = () => {
      const nextQuestion = quizService.nextQuestion();
      if (nextQuestion) {
        currentQuestion.value = nextQuestion;
      } else {
        personalizedMessage.value = score.value === totalQuestions.value
          ? 'Täiuslik sooritus!'
          : 'Hea töö!';
        currentQuestion.value = null;
      }
    };

    const answerQuestion = (selectedOption: string) => {
      if (currentQuestion.value) {
        const isCorrect = quizService.checkAnswer(selectedOption);
        userAnswers.value.push({
          question: currentQuestion.value.question,
          answer: currentQuestion.value.answer,
          userAnswer: selectedOption,
          correct: isCorrect
        });

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
      quizService.resetQuiz();
      score.value = 0;
      userAnswers.value = [];
      totalQuestions.value = quizService.getQuestions().length;
      currentQuestion.value = quizService.startQuiz();
      isModalVisible.value = false;
    };

    return {
      currentQuestion,
      score,
      totalQuestions,
      feedbackMessage,
      personalizedMessage,
      userAnswers,
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
.quiz-container {
  text-align: center;
  padding: 20px;
}

.options-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.question {
  font-size: 2rem;
  margin-bottom: 30px;
}
</style>

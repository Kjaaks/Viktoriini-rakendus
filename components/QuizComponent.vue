<template>
  <div class="quiz-container">
    <div class="title-area">
      <h2 class="question">{{ currentQuestion?.question }}</h2>
    </div>

    <div class="content-background">
      <div class="content-box">
        <div v-if="currentQuestion">
          <div class="options-container">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              @click="answerQuestion(option)"
              class="button-details"
              :class="{
                correct: isAnswered && option === currentQuestion.answer,
                incorrect: isAnswered && selectedOption === option && option !== currentQuestion.answer
              }"
              :disabled="isAnswered"
            >
              {{ option }}
            </button>
          </div>

          <div v-if="isAnswered">
            <button @click="loadNextQuestion" class="button-details next-question-button">
              Järgmine küsimus
            </button>
          </div>
          <div class="progress-indicator">
            <span
              v-for="(_, index) in totalQuestions"
              :key="index"
              class="progress-dot"
              :class="getDotClass(index)"
            />
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
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { QuizService } from '~/services/QuizService';
import { QuestionService } from '~/services/QuestionService';
import { Question } from '~/models/Question';
import ResultTable from './ResultTable.vue';
import type { AnswerEntry } from './ResultTable.vue';
import NavBar from './NavBar.vue';

export default defineComponent({
  name: 'QuizComponent',
  components: { ResultTable, NavBar },
  setup() {
    const questionService = new QuestionService();
    const quizService = new QuizService(questionService);

    const currentQuestion = ref<Question | null>(null);
    const score = ref(0);
    const personalizedMessage = ref('');
    const totalQuestions = ref(0);
    const userAnswers = ref<AnswerEntry[]>([]);

    const selectedOption = ref<string | null>(null);
    const isAnswered = ref(false);

    onMounted(() => {
      totalQuestions.value = quizService.getQuestions().length;
      currentQuestion.value = quizService.startQuiz();
    });

    const loadNextQuestion = () => {
      const nextQuestion = quizService.nextQuestion();
      if (nextQuestion) {
        currentQuestion.value = nextQuestion;
        selectedOption.value = null;
        isAnswered.value = false;
      } else {
        personalizedMessage.value = score.value === totalQuestions.value
          ? 'Täiuslik sooritus!'
          : 'Hea töö! Järgmine kord läheb paremini :)';
        currentQuestion.value = null;
      }
    };

    const answerQuestion = (option: string) => {
      if (!currentQuestion.value || isAnswered.value) return;
      selectedOption.value = option;
      const isCorrect = quizService.checkAnswer(option);
      isAnswered.value = true;

      userAnswers.value.push({
        question: currentQuestion.value.question,
        answer: currentQuestion.value.answer,
        userAnswer: option,
        correct: isCorrect
      });

      if (isCorrect) score.value++;
    };

    const restartQuiz = () => {
      quizService.resetQuiz();
      score.value = 0;
      userAnswers.value = [];
      totalQuestions.value = quizService.getQuestions().length;
      currentQuestion.value = quizService.startQuiz();
      selectedOption.value = null;
      isAnswered.value = false;
    };

    const getDotClass = (index: number) => {
      if (index === quizService.currentQuestionIndex) return 'active';
      const entry = userAnswers.value[index];
      if (!entry) return '';
      return entry.correct ? 'correct' : 'incorrect';
    };

    return {
      currentQuestion,
      score,
      totalQuestions,
      personalizedMessage,
      userAnswers,
      answerQuestion,
      loadNextQuestion,
      restartQuiz,
      selectedOption,
      isAnswered,
      getDotClass
    };
  }
});
</script>

<style scoped>
.question {
  font-size: 3rem;
  margin-bottom: 30px;
}

.options-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 20px;
}

.button-details {
    padding: 15px 30px;
  }

.button-details.correct {
  background-color: #69ac6c;
  color: white;
  border: 0;
}

.button-details.incorrect {
  background-color: #f8d7da;
  color: rgb(255, 0, 0);
  border: 0;
}

.next-question-button {
  margin-top: 22px;
  padding: 10px 24px;
  font-size: 1.1rem;
  color: white;
  border-radius: 8px;
}

.next-question-button:hover {
  background-color: white;
  color: black;
  border-radius: 8px;
  border-color: black;
}
.content-box {
  max-width: 700px;
}


  /* Edusammu nupukesed */
  .progress-indicator {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
  border: 2px solid transparent;
  transition: background-color 0.3s, border-color 0.3s;
}
.progress-dot.active {
  border-color: #000;
}
.progress-dot.correct {
  background-color: #63ad66;
}

.progress-dot.incorrect {
  background-color: #fd2617;
}
</style>

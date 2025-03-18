import type { Question } from "~/models/Question";
import { QuestionService } from "./QuestionService";

export class QuizService {
    private questions: Question[] = [];
    private currentQuestionIndex: number = 0;
    private score: number = 0;
  
    constructor(questionService: QuestionService) {
      this.questions = questionService.getQuestions();
    }
  
    getQuestions(): Question[] {
      return this.questions;
    }
  
    getCurrentQuestion(): Question | null {
      return this.questions[this.currentQuestionIndex] || null;
    }
  
    startQuiz(): Question | null {
      this.currentQuestionIndex = 0;
      return this.getCurrentQuestion();
    }
  
    checkAnswer(selectedOption: string): boolean {
      const correctAnswer = this.questions[this.currentQuestionIndex].answer;
      const isCorrect = selectedOption === correctAnswer;
      if (isCorrect) {
        this.score++;
      }
      return isCorrect;
    }
  
    nextQuestion(): Question | null {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        return this.getCurrentQuestion();
      }
      return null;
    }
  
    getScore(): number {
      return this.score;
    }
  
    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
    }
  }
  
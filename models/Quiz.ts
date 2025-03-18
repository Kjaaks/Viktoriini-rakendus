import { Question } from './Question';
import { User } from './User';

export class Quiz {
  questions: Question[];
  currentQuestionIndex: number;
  user: User;

  constructor(userName: string) {
    this.questions = [
      new Question('Mis on Eesti pealinn?', ['Tallinn', 'Tartu', 'Narva'], 'Tallinn'),
      new Question('Mis on Eesti rahvaarv?', ['1,3 miljonit', '2 miljonit', '3 miljonit'], '1,3 miljonit'),
      new Question('Mis on Eesti ametlik keel?', ['Eesti keel', 'Soome keel', 'Vene keel'], 'Eesti keel'),
      new Question('Mis on Eesti suvepealinn?', ['Tallinn', 'Pärnu', 'Tartu'], 'Pärnu')
    ];
    this.currentQuestionIndex = 0;
    this.user = new User(userName);
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex++];
    } else {
      return null;
    }
  }

  checkAnswer(selectedOption: string): boolean {
    const currentQuestion = this.questions[this.currentQuestionIndex - 1];
    const correct = currentQuestion.checkAnswer(selectedOption);
    if (correct) this.user.incrementScore();
    return correct;
  }

  getScore() {
    return this.user.score;
  }
}

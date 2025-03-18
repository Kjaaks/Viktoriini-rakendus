
import { Question } from '@/models/Question';

export class QuestionService {
  private questions: Question[] = [];

  constructor() {
    this.questions = [
      new Question('Mis on Eesti pealinn?', ['Tallinn', 'Tartu', 'Narva'], 'Tallinn'),
      new Question('Mis on Eesti rahvaarv?', ['1,3 miljonit', '2 miljonit', '3 miljonit'], '1,3 miljonit'),
      // new Question('Mis on Eesti ametlik keel?', ['Eesti keel', 'Soome keel', 'Vene keel'], 'Eesti keel'),
      // new Question('Mis on Eesti suvepealinn?', ['Tallinn', 'Pärnu', 'Tartu'], 'Pärnu'),
      // new Question('Mis on Eesti suurim saar?', ['Saaremaa', 'Hiiumaa', 'Muhu'], 'Saaremaa')
    ];
  }

  getQuestions(): Question[] {
    return this.questions;
  }
}

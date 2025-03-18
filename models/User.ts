export class User {
    name: string;
    score: number;
  
    constructor(name: string) {
      this.name = name;
      this.score = 0;
    }
  
    incrementScore() {
      this.score++;
    }
  }
  
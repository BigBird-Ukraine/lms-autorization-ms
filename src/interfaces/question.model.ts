export interface IQuestion {
  _id?: string;
  question: string;
  user_id: string;
  description?: string;
  answers: [{
    _id: string
    value: string;
    correct: boolean;
  }];
  level: string;
  subject: string;
  group: [string];
  tags: [string];
  lessons_id?: [string];
}

export interface IAnswers {
  questions_id: [{
    _id: string,
    answers: IAnswer[];
  }];
}

export interface IAnswer {
  correct: boolean;
}

export interface IPassedTest {
  lesson_label?: string;
  lesson_description?: string;
  questions: [{
    question: string;
    description: string;
    level: number;
    subject: string;
  }];
  result: number;
  user_id: string;
}

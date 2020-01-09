export interface IQuestion {
    _id?: string;
    question: string;
    user_id: string;
    description?: string;
    answers: [{
        value: string;
        correct: boolean;
    }];
    level: string;
    subject: string;
    group: [string];
    tags: [string];
    lessons_id?: [string];
}

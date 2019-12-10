import { Question } from '../../database';

class HelperService {

    getHelperTags() {
        return Question.distinct('tags');
    }

    getHelperLevel() {
        return Question.distinct('level');
    }

    getHelperSubject() {
        return Question.distinct('subject');
    }

    getHelperGroup() {
      return Question.distinct('group');
    }
}

export const helperService = new HelperService();

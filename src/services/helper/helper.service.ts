import { Question } from '../../database';

class HelperService {

    getHelperTags() {
        return Question.distinct('tags');
    }

    getHelperLevel() {
        return Question.distinct('level');
    }
}

export const helperService = new HelperService();

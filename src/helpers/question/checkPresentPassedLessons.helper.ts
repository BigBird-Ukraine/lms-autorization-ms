import { IPassedLesson } from '../../interfaces';
import { lessonService } from '../../services/lesson';

export const checkPresentPassedLesson = async (lesson: Partial<IPassedLesson>) => {
  const presentPassedLesson = await lessonService.getPassedLessonByParams(lesson);

  return presentPassedLesson ? presentPassedLesson._id : null;
};

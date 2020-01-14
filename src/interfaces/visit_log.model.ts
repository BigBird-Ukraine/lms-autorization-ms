export interface IVisitLog {
  group_id: string;
  attendance: [{
    date: string;
    present_student_id: string[];
    absent_student_id: string[];
  }];
}

export interface IVisitLog {
  group_id: string;
  attendance: [{
    date: string;
    present_students_id: string[];
    absent_students_id: string[];
  }];
}

export interface Task {
    task: String;
    start_date: Date;
    end_date: Date;
    priority: Number;
    parent: String;
    finished: Boolean;
}
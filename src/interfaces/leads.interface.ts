export interface IClass {
  name: string; // e.g., "Class 6th"
  // board: string; // e.g., "CBSC"
  // subjects: string[]; // Array of subjects, e.g., ['Mathematics', 'Science', 'English', 'Hindi']
  // telecrmClassName: string; // e.g., "6th"
  // createdAt: string;
  // updatedAt: string;
  _id: string; // Assuming unique identifier for class
}

export interface ILead {
  board: string;
  city: string;
  class: IClass[];
  createdAt: string; 
  createdBy: string; 
  creationStatus: string;
  interactedWith: string;
  mobile: string;
  referralCode: string;
  standard: string;
  state: string;
  status: string;
  studentName: string;
}

export interface ILeadSummary {
  totalLeads: number;
  todayLeads: number;
  yesterdayLeads: number;
  data: ILeadCount[];
}

export interface ICreateLead {
    studentName: string;
    mobile: string;
    standard: string;
    createdBy: string;
    board: string;
    interactedWith: string;
}

export interface ILeadCount{
  _id:string;
  count:number
}
export interface IPageParams{
  pageNum: number;
  pageSize: number;
}

export interface FilterState {
  statuses?: string[]; // Optional array of strings
  singleDate?: Date; // Optional single date
  dateRange?: { startDate?: Date; endDate?: Date }; // Optional date range
}

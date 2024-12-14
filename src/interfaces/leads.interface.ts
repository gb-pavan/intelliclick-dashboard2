export interface ILead {
  board: string;
  city: string;
  class: string[];
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
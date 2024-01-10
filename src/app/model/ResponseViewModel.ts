
export interface ResponseViewModel<ViewModel> {
  // status: Status;
  // navigation: Navigation;
  data: ViewModel;
  itemList: any[];
  code: number;
  totalCount: number;
}

export interface Status {
  code: number;
  message: string;
  description: string;
  totalCount: string;
}

export interface Navigation {
  prevLink: string;
  nextLink: string;
  totalPages: number;
  totalCount: number;
}

export interface BaseViewModel<ViewModel> {
  isSuccess: boolean;
  message: string;
  code: number;
  errorCode: string;
  data: ViewModel; // Using the TemplateData interface
}
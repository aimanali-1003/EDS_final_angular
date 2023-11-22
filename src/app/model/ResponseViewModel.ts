export interface ResponseViewModel<ViewModel> {
  // status: Status;
  // navigation: Navigation;
  data: ViewModel;
  itemList: any[]; // Adjust the type to match the actual type of itemList in your response
  code: number;
  totalCount: number;
}

export interface Status {
  code: number;
  message: string;
  description: string;
  totalCount: string; // Adjust this to the appropriate type based on your API response
}

export interface Navigation {
  prevLink: string;
  nextLink: string;
  totalPages: number;
  totalCount: number;
}

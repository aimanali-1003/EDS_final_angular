export interface MasterDataModel {
    id: number;
    LookupType: string;
    MasterDataLookups: FilterModel[];
  }
  
  export interface FilterModel {
    id: number;
    code: string;
    name: string;
  }
  
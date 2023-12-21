export class OrganizationSearchSM {
    public PageNumber: number;
    public PageSize: number;
    public ParentCode?: string;
    public ReqGridLevel?: string;
    public ConsolidatedCode?: string;
    public RollupCode?: string;
    public GPOCode?: string;
    public GroupCode?: string;
    public UnitCode?: string;
  
    constructor(pageNumber: number, pageSize: number, parentCode?: string, reqGridLevel?: string, ConsolidatedCode?: string, RollupCode?: string, GPOCode?: string, GroupCode?: string, UnitCode?: string) {
      this.PageNumber = pageNumber;
      this.PageSize = pageSize;
      this.ParentCode = parentCode;
      this.ReqGridLevel = reqGridLevel;
      this.ConsolidatedCode = ConsolidatedCode;
      this.RollupCode = RollupCode;
      this.GPOCode = GPOCode;
      this.GroupCode = GroupCode;
      this.UnitCode = UnitCode;
    }
  }
  
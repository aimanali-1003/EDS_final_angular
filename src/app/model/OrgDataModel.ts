
export class OrgDataModel {
    public organizationID: number | null;
    public organizationCode: string;
    public parentOrganizationCode: string | null;
    public parentOrganizationLevel: string | null;
    public organizationLevel: string | null;
  
    constructor() {
      this.organizationID = null;
      this.organizationCode = '';
      this.parentOrganizationCode = null;
      this.parentOrganizationLevel = null;
      this.organizationLevel = null;
    }
  }
  
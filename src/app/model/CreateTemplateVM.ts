export class CreateTemplateVM {
    templateId: number;
    templateName: string;
    categoryId: number;
    isActive: boolean;
    templateColumns: TemplateColumnModelVM[];
  
    constructor() {
      this.templateId = 0;
      this.templateName = '';
      this.categoryId = 0;
      this.isActive = false;
      this.templateColumns = [];
    }
  }
  
  export class TemplateColumnModelVM {
    columnId: number;
    serialNumber: number;
  
    constructor() {
      this.columnId = 0;
      this.serialNumber = 0;
    }
  }
  
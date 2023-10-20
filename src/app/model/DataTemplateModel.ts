export class DataTemplateModel { 
    public templateId:number;
    public templateName: string;
    public categoryID: number;
    public columnNames: string[];
    public columnsId: number[]; // Rename from 'columnsID' to 'columnsId'
    public active: boolean;
  
    constructor() { 
        this.templateId=0;
      this.templateName = '';
      this.categoryID = 0;
      this.columnNames = [];
      this.columnsId = [];
      this.active = true;
    }
  }
  
export class DataTemplateModel { 
    public templateName: string;
    public categoryID: number;
    public columnNames: string[];
    public columnsID:string [];
    public active:boolean;
    constructor()
    { 
        this.templateName="",
        this.categoryID=0,
        this.columnNames=[],
        this.columnsID=[],
        this.active=true;
    }
  }
  
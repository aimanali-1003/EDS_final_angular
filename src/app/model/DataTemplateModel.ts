export class DataTemplateModel { 
    public templateName: string;
    public categoryID: number;
    public columnNames: string[];
    public active:boolean;
    constructor()
    { 
        this.templateName="",
        this.categoryID=0,
        this.columnNames=[],
        this.active=true;
    }
  }
  
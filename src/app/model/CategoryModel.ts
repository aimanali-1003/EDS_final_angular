import { ColumnsVM } from "./ColumnDataModel";
export class categoryDataModel{
    public categoryName :string;
    public categoryCode :string; 
    public active:boolean;

    constructor(){
        this.categoryName = "";
        this.categoryCode = ""; 
        this.active = false;
    }
}

 // Assuming ColumnsVM model is defined

export class CategorySM {
  categoryId: number;
  categoryCode: string;
  categoryName: string;
  isActive: boolean;
  edsColumns: ColumnsVM[] | null;

  constructor(data?: any) {
    if (data) {
      this.categoryId = data.categoryId || 0;
      this.categoryCode = data.categoryCode || '';
      this.categoryName = data.categoryName || '';
      this.isActive = data.isActive || false;
      this.edsColumns = data.edsColumns
        ? data.edsColumns.map((column: any) => new ColumnsVM(column))
        : null;
    } else {
      // Set default values if no data is provided
      this.categoryId = 0;
      this.categoryCode = '';
      this.categoryName = '';
      this.isActive = false;
      this.edsColumns = null;
    }
  }
}

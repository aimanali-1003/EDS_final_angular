import { ColumnsVM } from "./ColumnDataModel"; // Assuming ColumnsVM model is defined

// export class TemplateColumnVM {
//   templateColumnId: number;
//   templateId: number;
//   columnsId: number;
//   serialNumber: number;
//   isActive: boolean;
//   columns: ColumnsVM;

//   constructor(data?: any) {
//     if (data) {
//       this.templateColumnId = data.templateColumnId || 0;
//       this.templateId = data.templateId || 0;
//       this.columnsId = data.columnsId || 0;
//       this.serialNumber = data.serialNumber || 0;
//       this.isActive = data.isActive || false;
//       this.columns = data.columns ? new ColumnsVM(data.columns) : new ColumnsVM();
//     } else {
//       // Set default values if no data is provided
//       this.templateColumnId = 0;
//       this.templateId = 0;
//       this.columnsId = 0;
//       this.serialNumber = 0;
//       this.isActive = false;
//       this.columns = new ColumnsVM();
//     }
//   }
// }
export class TemplateColumnVM {
  columnID: number;
  serial_Number: number;

  constructor(data?: any) {
    this.columnID = data?.columnID || 0;
    this.serial_Number = data?.serial_Number || 0;
  }
}

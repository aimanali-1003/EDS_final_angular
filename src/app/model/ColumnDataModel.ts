import { CategorySM } from "./CategoryModel"; // Assuming CategoryVM model is defined

export class ColumnsVM {
  columnsId: number;
  columnName: string;
  columnCode: string;
  categoryId: number;
  isActive: boolean;
  category: CategorySM | null;
  serialNumber!: number;

  constructor(data?: any) {
    if (data) {
      this.columnsId = data.columnsId || 0;
      this.columnName = data.columnName || '';
      this.columnCode = data.columnCode || '';
      this.categoryId = data.categoryId || 0;
      this.isActive = data.isActive || false;
      this.category = data.category ? new CategorySM(data.category) : null;
    } else {
      // Set default values if no data is provided
      this.columnsId = 0;
      this.columnName = '';
      this.columnCode = '';
      this.categoryId = 0;
      this.isActive = false;
      this.category = null;
    }
  }
}

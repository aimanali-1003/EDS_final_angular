import { CategorySM } from "./CategoryModel";
import { ColumnsVM } from "./ColumnDataModel";
import { TemplateColumnModelVM } from "./CreateTemplateVM";
import { TemplateColumnVM } from "./TemplateColumnDataModel"; // Assuming TemplateColumnVM model is defined

export class DataTemplateModel { 
    public templateId:number;
    public templateName: string;
    public categoryID: number;
    public columnNames: string[];
    public columnsId: number[]; // Rename from 'columnsID' to 'columnsId'
    public active: boolean;
    templateColumns: TemplateColumnModelVM[];

  
    constructor() { 
        this.templateId=0;
      this.templateName = '';
      this.categoryID = 0;
      this.columnNames = [];
      this.columnsId = [];
      this.active = true;
      this.templateColumns = [];
    }
  }
  
 
  export class TemplateVM {
    templateId: number;
    templateName: string;
    categoryId: number;
    createdBy: string;
    createdAt: Date;
    updatedBy: string | null;
    updatedAt: Date | null;
    isActive: boolean;
    category: CategorySM | null; 
    edsTemplateColumns: ColumnsVM[];
    templateColumns!: TemplateColumnModelVM[];
  
    constructor(data?: any) {
      if (data) {
        this.templateId = data.templateId || 0;
        this.templateName = data.templateName || '';
        this.categoryId = data.categoryId || 0;
        this.createdBy = data.createdBy || '';
        this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
        this.updatedBy = data.updatedBy || null;
        this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        this.isActive = data.isActive || false;
        this.category = data.category ? new CategorySM(data.category) : null;
        this.edsTemplateColumns = data.edsTemplateColumns
          ? data.edsTemplateColumns.map((column: any) => new TemplateColumnVM(column))
          : [];
      } else {
        // Set default values if no data is provided
        this.templateId = 0;
        this.templateName = '';
        this.categoryId = 0;
        this.createdBy = '';
        this.createdAt = new Date();
        this.updatedBy = null;
        this.updatedAt = null;
        this.isActive = false;
        this.category = null;
        this.edsTemplateColumns = [];
        this.templateColumns = [];
      }
    }
  }
  
  // export class TemplateVM {
  //   templateId: number;
  //   templateName: string;
  //   categoryId: number;
  //   createdBy: string;
  //   createdAt: Date;
  //   updatedBy: string | null;
  //   updatedAt: Date | null;
  //   isActive: boolean;
  //   category: CategorySM | null;
  //   edsTemplateColumns: TemplateColumnVM[];
  
  //   constructor(data?: any) {
  //     this.templateId = data?.templateId || 0;
  //     this.templateName = data?.templateName || '';
  //     this.categoryId = data?.categoryId || 0;
  //     this.createdBy = data?.createdBy || '';
  //     this.createdAt = data?.createdAt ? new Date(data.createdAt) : new Date();
  //     this.updatedBy = data?.updatedBy || null;
  //     this.updatedAt = data?.updatedAt ? new Date(data.updatedAt) : null;
  //     this.isActive = data?.isActive || false;
  //     this.category = data?.category ? new CategorySM(data.category) : null;
  //     this.edsTemplateColumns = data?.templateColumns
  //       ? data.templateColumns.map((column: any) => new TemplateColumnVM(column))
  //       : [];
  //   }
  // }
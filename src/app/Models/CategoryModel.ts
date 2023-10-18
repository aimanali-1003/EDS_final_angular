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
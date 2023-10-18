export class clientDataModel{
    public clientName :string;
    public clientCode :string;
    public organizationId: string;
    public active:boolean;

    constructor(){
        this.clientName = "";
        this.clientCode = "";
        this.organizationId = "";
        this.active = false;
    }
}
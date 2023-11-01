export class clientDataModel{
    public clientID: number | null;
    public clientName :string;
    public clientCode :string;
    public organizationId: string;
    public active:boolean;
    public isDelete:boolean;

    constructor(){
        this.clientID = null;
        this.clientName = "";
        this.clientCode = "";
        this.organizationId = "";
        this.active = false;
        this.isDelete = false;
    }
}
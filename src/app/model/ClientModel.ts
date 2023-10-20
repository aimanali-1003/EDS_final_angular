export class clientDataModel{
    public clientID: number | null;
    public clientName :string;
    public clientCode :string;
    public organizationId: string;
    public active:boolean;

    constructor(){
        this.clientID = null;
        this.clientName = "";
        this.clientCode = "";
        this.organizationId = "";
        this.active = false;
    }
}
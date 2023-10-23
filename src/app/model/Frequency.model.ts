
export class FrequencyDataModel{
    public frequencyId: number | null;
    public frequencyType: string;
    public dateOfMonth :Date | null;

    constructor(){
        this.frequencyId = null;
        this.frequencyType = '';
        this.dateOfMonth = null;

    }
}
export default class User{
    public name: string;
    public password: string;
    public pushups: number;
    public pullups: number;
    public squats: number;
    public situps: number;
    public run: number;
    
    constructor(old: User | null = null)
    {
        this.name = "Unknown";
        this.password = "";
        this.pushups = 0;
        this.pullups = 0;
        this.squats = 0;
        this.situps = 0;
        this.run = 0;
        if(old === null) return;
        this.name = old.name;
        this.password = old.password;
        this.pushups = old.pushups;
        this.pullups = old.pullups;
        this.squats = old.squats;
        this.situps = old.situps;
        this.run = old.run;
    }

}
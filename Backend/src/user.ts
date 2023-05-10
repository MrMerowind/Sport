export default class User{
    public name: string;
    public password: string;
    public pushups: number;
    public pullups: number;
    public squats: number;
    public situps: number;
    public run: number;
    
    constructor()
    {
        this.name = "Unknown";
        this.password = "";
        this.pushups = 0;
        this.pullups = 0;
        this.squats = 0;
        this.situps = 0;
        this.run = 0;
    }

}
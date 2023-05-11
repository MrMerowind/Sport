import { readFileSync, writeFileSync, unlinkSync } from "fs"
import User from "user";

export default class UserList{
    public list: User[];

    public load()
    {
        const words = readFileSync("./data.txt", "utf-8");
        const wordsLines = words.split("\n");
        wordsLines.forEach(line => {
            const lineData = line.split(" ");
            const newUser = new User();
            newUser.name = lineData[0];
            newUser.password = lineData[1];
            newUser.pushups = parseInt(lineData[2]);
            newUser.pullups = parseInt(lineData[3]);
            newUser.squats = parseInt(lineData[4]);
            newUser.situps = parseInt(lineData[5]);
            newUser.run = parseInt(lineData[6]);
            this.list.push(newUser);
        })
    }

    public updateUser(newUser: User)
    {
        for(let i = 0; i < this.list.length; i++)
        {
            if(this.list[i].name != newUser.name
                || this.list[i].password != newUser.password) continue;
            
            this.list[i] = newUser;
            this.save();
            return;
        }
        this.list.push(newUser);
    }

    public getUsersWithoutPassword(): User[]
    {
        const returnList: User[] = [];
        this.list.forEach(user => {
            const copyUser = new User(user);
            copyUser.password = "secret";
            returnList.push(copyUser);
        })
        return returnList;
    }

    public save()
    {
        unlinkSync("./data.txt");
        let textToSave = "";
        for(let i = 0; i < this.list.length; i++)
        {
            if(i != 0) textToSave += "\n";
            textToSave += this.list[i].name + " ";
            textToSave += this.list[i].password + " ";
            textToSave += this.list[i].pushups.toString() + " ";
            textToSave += this.list[i].pullups.toString() + " ";
            textToSave += this.list[i].squats.toString() + " ";
            textToSave += this.list[i].situps.toString() + " ";
            textToSave += this.list[i].run.toString();
        }
        writeFileSync("./data.txt", textToSave, "utf-8");
    }
}
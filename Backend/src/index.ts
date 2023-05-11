import express from "express";
import UserList from "./userList";
import cors from "cors";
import User from "./user";
import bodyParser from "body-parser";

var HOST = "localhost";

const app = express();

const userList = new UserList();
userList.load();

app.use(cors({
    origin: '*'
}));

app.get("/hof", (req, res) => {
    
    try
    {
        const response = userList.getUsersWithoutPassword();
        res.send(response);
    }
    catch(e)
    {
        res.end();
    }
})

app.post("/load", bodyParser.json(), (req, res) => {
    try
    {
        console.log("Request load: ", req.body);
        const response: User = userList.getUserData(req.body);

        console.log("Response load: ", response);
        res.send(response);
    }
    catch(e)
    {
        res.end();
    }
    
})

app.post("/update", bodyParser.json(), (req, res) => {
    try
    {
        console.log("Request update: ", req.body);
        userList.updateUser(req.body);
        userList.save();
        res.end();
    }
    catch(e)
    {
        res.end();
    }
})

app.listen(40228, HOST, () => {
    console.log("Server running");
});
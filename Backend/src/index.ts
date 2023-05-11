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
        res.send(response).end();
    }
    catch(e)
    {
        res.end();
    }
})

app.get('/load/:login/:password', function(req, res) {

    try
    {
        const search: User = new User();
        search.name = req.params.login;
        search.password = req.params.password;
        console.log("Request login for user: ", search.name);
        const response: User = userList.getUserData(search);

        console.log("Response: ", response);
        res.send(response).end();
    }
    catch(e)
    {
        res.end();
    }
});

app.post("/update", bodyParser.json(), (req, res) => {
    try
    {
        console.log("Request update for user: ", req.body.name);
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
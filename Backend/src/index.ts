import express from "express";
import UserList from "userList";

const app = express();

const userList = new UserList();
userList.load();

app.get("/hof", (req, res) => {
    
    const response = userList.getUsersWithoutPassword();
    res.send(response);
})

app.post("/update", (req, res) => {
    
    if(!req.body.toString()) return;
    userList.updateUser(req.body);
    userList.save();
    // res.send(response);
})


app.listen(40227, () => {
    console.log("Server running");
});
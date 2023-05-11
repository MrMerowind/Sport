import express from "express";
import UserList from "userList";
import { stringify } from "querystring";

const app = express();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

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




server.listen(40227, () => {
    console.log("Server running");
});
//https://coc.guide/
//https://clashofclans.fandom.com/wiki/Clash_of_Clans_Wiki
//Routes
import rootRouter from "./Routes/root";
import clashofclansUpgradeTrackerRouter from "./Routes/clashOfClansUpgrade";
import statsTrackerRouter from "./Routes/stats";
import ajaxRequests from "./Routes/ajax";
import tools from "./Routes/tools";
//User
import authRouter from "./Routes/user";
import Database from "./Database/Models/User/index";
//Other modules
import dotenv from "dotenv";
import { set, connect, connection } from "mongoose";
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from "cors";
import { join } from "path";
import methodOverride from 'method-override';
import { Client } from "clashofclans.js";

//Clash of Clans API Client
const API = new Client();

//process.env
dotenv.config();

//MongoDB Connection
connection.on("open", () => {
    console.log("MongoDB connection established!");
    Database.Role.estimatedDocumentCount({}, (error, count) => {
        if (!error && count == 0) {
            Database.Role.create({
                name: "user"
            }).then(err => {
                if (err) console.log(err);
                console.log("Added 'user' to roles collection!");
            });
            Database.Role.create({
                name: "moderator"
            }).then(err => {
                if (err) console.log(err);
                console.log("Added 'moderator' to roles collection!");
            });
            Database.Role.create({
                name: "admin"
            }).then(err => {
                if (err) console.log(err);
                console.log("Added 'admin' to roles collection!");
            });
        };
    });
});

//Create an app
const app = express();

//view engine
app.set('views', join(__dirname, "Views"));
app.set('view engine', 'pug');

//Create a port
const port = process.env.PORT || 3000;

app.use(cors({
    origin: `http://localhost:${port}`
}));

//Parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//Parse requests of content-type application/json
app.use(bodyParser.json());

app.use(methodOverride('_method'));
app.use(cookieParser());

//Static files
app.use(express.static(join(__dirname, "Public")));

//Using all routes
app.use(rootRouter, authRouter, clashofclansUpgradeTrackerRouter, statsTrackerRouter, ajaxRequests, tools);

//App
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
app.all('*', (req, res) => res.render("Errors/404"));
app.listen(port, async () => {
    await connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    set("useNewUrlParser", true);
    set("useFindAndModify", false);
    set("useUnifiedTopology", true);
    await API.init({
        email: "night.clash.tracker@gmail.com",
        password: process.env.PASSWORD
    });
    console.log(`The dashboard is live on http://localhost:${port}!`);
});

export { API };
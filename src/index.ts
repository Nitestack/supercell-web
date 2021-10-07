//https://coc.guide/
//https://clashofclans.fandom.com/wiki/Clash_of_Clans_Wiki
//Routes
import rootRouter from "./Routes/root";
import clashofclansUpgradeTrackerRouter from "./Routes/clashOfClansUpgrade";
import statsTrackerRouter from "./Routes/stats";
import ajaxRequests from "./Routes/ajax";
import toolsRouter from "./Routes/tools";
import adminRouter from "./Routes/admin";
//User
import authRouter from "./Routes/user";
import Database from "./Database/Models/User/index";
//Middleware
import Middleware from "./Middleware/index";
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

//View engine
app.set('view engine', 'pug');
app.set('views', join(__dirname, "Views"));

//Static files
app.use(express.static(join(__dirname, "Public")));

//Define the port number
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

//Using middleware
app.use(Middleware.validateToken);

//Applying routes
app.use(rootRouter, adminRouter, authRouter, clashofclansUpgradeTrackerRouter, statsTrackerRouter, ajaxRequests, toolsRouter);

//App
app.all('*', (req, res) => res.render("Errors/404"));

//Setting local variables
app.locals.websiteName = "NightClash";
Middleware.applyClashOfClansConstants(app);
Middleware.applyUtilClass(app);

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
    console.log(`The server is live on http://localhost:${port}!`);
});

export { API };
//https://coc.guide/
//https://clashofclans.fandom.com/wiki/Clash_of_Clans_Wiki
//Routes
import rootRouter from "./API/Routes/root";
import clashofclansUpgradeTrackerRouter from "./API/Routes/clashOfClansUpgrade";
import statsTrackerRouter from "./API/Routes/stats";
import ajaxRequests from "./API/Routes/ajax";
import toolsRouter from "./API/Routes/tools";
import adminRouter from "./API/Routes/admin";
//User
import authRouter from "./API/Routes/user";
import Database from "./Configuration/Database/Models/index";
//Middleware
import Middleware from "./API/Middleware/index";
//Other modules
import dotenv from "dotenv";
import { set, connect, connection } from "mongoose";
import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import { join } from "path";
import { lstatSync, readdirSync } from "fs";
import methodOverride from 'method-override';
import { Client } from "clashofclans.js";

//Clash of Clans API Client
const API = new Client();

//process.env
dotenv.config();

//MongoDB Connection
connection.on("open", () => {
    console.log("MongoDB connection established!");
    Database.Role.countDocuments({}, (error, count) => {
        if (!error && count == 0) {
            Database.Role.create({
                name: "user"
            }).then(err => {
                if (err) console.log(err);
                console.log("Added 'user' to roles collection!");
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
app.set('views', join(__dirname, "Website", "Views"));

//Static files
app.use(express.static(join(__dirname, "Website", "Public")));

//Define the port number
const port = process.env.PORT || 3000;

app.use(cors({
    origin: `http://localhost:${port}`
}));
//Parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//Parse requests of content-type application/json
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

//Using middleware
app.use(Middleware.Authentication.validateToken);

//Applying routes
function readRoutes(path: string) {
    for (const file of readdirSync(path)) {
        if (lstatSync(join(path, file)).isDirectory()) readRoutes(join(path, file));
        else if (!file.toLowerCase().endsWith("ts")) continue;
        else import(join(__dirname, path, file)).then((router) => {
            console.log(join(__dirname, path, file));
            app.use(router);
        });
    };
};
readRoutes(join(__dirname, "API", "Routes"));

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

export { API, app };
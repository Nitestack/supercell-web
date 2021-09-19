import childProcess from "child_process";
var oldSpawn = childProcess.spawn;
function mySpawn() {
    console.log('spawn called');
    console.log(arguments);
    var result = oldSpawn.apply(this, arguments);
    return result;
}
childProcess.spawn = mySpawn;

//https://coc.guide/
//https://clashofclans.fandom.com/wiki/Clash_of_Clans_Wiki
import { set, connect, connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import rootRouter from "./Routes/root";
import clashofclansUpgradeTrackerRouter from "./Routes/clashOfClansUpgrade";
import statsTrackerRouter from "./Routes/stats";
import ajaxRequests from "./Routes/ajax";

import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from "cookie-parser";
import { join } from "path";
import methodOverride from 'method-override';
import { MessageEmbed, WebhookClient } from "discord.js";
import { Client } from "clashofclans.js";

const API = new Client();
const errorWebhook = new WebhookClient("869166346653548574", "AVTVHEQwdNzW-E51MnVN3HCIs-pDxQuuEJY9aG8VD2XtkW_0dXFbREJv163Wz2d3P8FY");

connection.on("open", () => console.log("MongoDB connection established!"));

const app = express();
app.set('views', join(__dirname, "Views"));
app.set('view engine', 'pug');
//@ts-ignore
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(join(__dirname, "Dist")));
app.locals.basedir = join(__dirname, "Dist");
app.use(rootRouter, clashofclansUpgradeTrackerRouter, statsTrackerRouter, ajaxRequests);
app.all('*', (req, res) => res.render("Errors/404"));
const port = process.env.PORT || 3000;
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
    console.log(`The dashboard is live on http://localhost:${port} !`)
});

process.on("unhandledRejection", (reason) => {
    console.log(reason);
    return errorWebhook.send(new MessageEmbed()
        .setTitle("Unhandled promise rejection")
        .setDescription(reason)
        .setTimestamp());
});

process.on("rejectionHandled", (promise) => {
    console.log(promise);
    return errorWebhook.send(new MessageEmbed()
        .setTitle("Rejection handled")
        .setDescription(promise)
        .setTimestamp());
});

export { API };
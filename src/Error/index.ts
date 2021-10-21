import { Request, Response } from "express";
/*import { WebhookClient, MessageEmbed, ColorResolvable } from "discord.js";*/
import { app } from "../index";
import { join } from "path";

/*const errorWebhook = new WebhookClient({
    id: "896779817050046485",
    token: "BODgF2-G76R2gM-OJhn9HrtyKOqQaPty-awyTk5T72yYIf1XXGs50zNHytMtwEzACfyz",
    url: "https://discord.com/api/webhooks/896779817050046485/BODgF2-G76R2gM-OJhn9HrtyKOqQaPty-awyTk5T72yYIf1XXGs50zNHytMtwEzACfyz"
});*/

export default class APIError {
    /**
     * Handles an internal server error
     * @param {any} err The error 
     * @param {Response} res The response 
     * @param {string?} redirectURL An URL to redirect to 
     */
    public static handleInternalServerError(err: any, res: Response, redirectURL?: string) {
        console.log(err);
        if (redirectURL) res.redirect(redirectURL);
        else res.render("Errors/503");
    };
    /**
     * Handles an error within an AJAX request
     * @param {any} err The error 
     * @param {Response} res The response
     * @param {string?} errorMessage The error message to give to the user
     */
    public static handleAjaxRequestError(err: any, res: Response, errorMessage?: string) {
        console.log(err);
        if (errorMessage) res.status(400).send(errorMessage);
        else res.status(400);
    };
    /**
     * Creates an Discord Message Embed and sends it 
     * @deprecated This function is available at Node v.16.6.0 or newer
     * @param {any} err The error to send
     */
    /*private static createErrorEmbed(err: any) {
        console.log(join(".."));
        return errorWebhook.send(new MessageEmbed()
            .setAuthor(app.locals.websiteName, join(".."))
            .setTitle("Error")
            .setThumbnail(join(".."))
            .setColor("RED")
            .setDescription(typeof err == "string" && err.length > 2048 ? err.split("").splice(0, 2045).join("") + "..." : err)
            .setFooter("Created by HydraNhani", join(".."))
            .setTimestamp() as unknown as string);
    };*/
};
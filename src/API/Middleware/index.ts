import AuthenticationMiddleware from "./auth";
import UpgradeTrackerMiddleware from "./upgrade";

export default class Middleware {
    public static Authentication = AuthenticationMiddleware;
    public static UpgradeTracker = UpgradeTrackerMiddleware;
};
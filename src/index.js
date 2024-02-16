import {DeclarifyHandler} from "./declarifyHandler.js";
import {DeclarifyScopeManager} from "./declarifyScopeManager.js";

export function declarify(target){
    let symbol=Symbol(DeclarifyScopeManager.currentScopeKey.description+'.[declarify]');
    return new Proxy(target, new DeclarifyHandler(symbol));
}
export * from "./declarifyScopeManager.js"
export * from "./declarifyKeep.js"

import {DeclarifyScopeManager} from "./declarifyScopeManager.js";
import {declarify} from "./index.js";

export class DeclarifyHandler {
    constructor(symbol) {
        this.declarifyScope = {};
        this.symbol = symbol;
    }

    construct(target, args) {
        DeclarifyScopeManager.enterScope(this.symbol)
        try {
            return declarify(new target(...args))
        } finally {
            DeclarifyScopeManager.exitScope()
        }
    }

    apply(target, thisArg, argumentsList) {

        DeclarifyScopeManager.enterScope(this.symbol)
        try {
            return target.call(thisArg, ...argumentsList)
        } finally {
            DeclarifyScopeManager.exitScope()
        }
    }

    get(target, prop, receiver) {
        return DeclarifyScopeManager.current.read(this.symbol, prop, () => {

            DeclarifyScopeManager.enterScope(Symbol(DeclarifyScopeManager.currentScopeKey.description + '.' + prop.toString()))
            try {
                const ret = target[prop];
                if (ret instanceof Function)
                    return declarify(ret.bind(target));
                else
                    return ret;
            } finally {
                DeclarifyScopeManager.exitScope()
            }

        });
    }
}

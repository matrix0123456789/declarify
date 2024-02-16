import {DeclarifyScopeManager} from "./declarifyScopeManager.js";

export function declarifyKeep(defaultValue){
    const count=DeclarifyScopeManager.current.nextCounter(declarifyKeep)
    return {
        get value(){
            return DeclarifyScopeManager.current.read(declarifyKeep,count, ()=>defaultValue);
        },
        set value(value){
            DeclarifyScopeManager.current.set(declarifyKeep,count, value);
        }
    }
}

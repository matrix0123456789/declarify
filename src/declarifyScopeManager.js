import {DeclarifyScope} from "./declarifyScope.js";

export const DeclarifyScopeManager = {
    scopes: new WeakMap(),
    currentScopeKey: null,
    stack: [Symbol('root')],
    setScope(scopeKey) {
        this.currentScopeKey = scopeKey
        if (!this.scopes.has(scopeKey)) {
            this.scopes.set(scopeKey, new DeclarifyScope())
        }
        this.scopes.get(this.currentScopeKey).clean();
    },
    enterScope(scopeKey) {
        console.log('enterScope', scopeKey)
        this.stack.push(scopeKey);
        this.setScope(scopeKey);
    },
    exitScope() {
        if (this.stack.length >= 2) {
            console.log('exitScope', this.currentScopeKey)
            this.stack.pop();
            this.setScope(this.stack[this.stack.length - 1]);
        } else {
            console.log('exitScope', 'no more scope')
        }
    },
    get current() {
        return this.scopes.get(this.currentScopeKey);
    }
}

DeclarifyScopeManager.setScope(DeclarifyScopeManager.stack[0])

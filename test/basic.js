import {should} from "chai";
import {declarify, declarifyKeep} from "../src/index.js"
import {DeclarifyScope} from "../src/declarifyScope.js";
import {DeclarifyScopeManager} from "../src/declarifyScopeManager.js";

should();

describe('function', function () {
    it('basicCall',()=>{
        const fun=declarify((arg)=>arg)
        fun(1).should.equal(1)
        fun(2).should.equal(2)
    })
    it('keep',()=>{
        const fun=declarify((arg)=>declarifyKeep(arg).value)
        fun(1).should.equal(1)
        fun(2).should.equal(1)
    })
})
describe('object', function () {
        it('basic', function () {
            let count = 0;
            const obj = {
                method() {
                    return ++count;
                },
                get getter(){
                    return ++count;
                }
            }
            const declarifiedObj = declarify(obj)
            declarifiedObj.method().should.equal(1);
            declarifiedObj.method().should.equal(2);
            declarifiedObj.method().should.equal(3);
            declarifiedObj.getter.should.equal(4);
            declarifiedObj.getter.should.equal(4);
            declarifiedObj.method().should.equal(5);
            declarifiedObj.getter.should.equal(4);

        });
    it('keepState', () => {
    });
});

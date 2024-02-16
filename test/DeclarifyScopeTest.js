import {should} from "chai";
import {declarify} from "../src/index.js"
import {DeclarifyScope} from "../src/declarifyScope.js";

should();
describe('declarifyScope', function () {
    it('basic', function () {
        let count = 0;

        function a() {
            return ++count;
        }

        const scope = new DeclarifyScope();
const s=Symbol();
        scope.read(s, "a", a).should.equal(1);
        scope.read(s, "a", a).should.equal(1);
        count.should.equal(1);

        scope.read(s, Symbol(), a).should.equal(2);
        scope.read(s, Symbol(), a).should.equal(3);
        count.should.equal(3);
    });
});

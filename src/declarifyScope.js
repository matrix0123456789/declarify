export class DeclarifyScope {
    objects = new WeakMap()
    countes = new WeakMap()

    read(type, key, callback) {
        if (!this.objects.has(type)) {
            this.objects.set(type, new Map())
        }
        let typeMap = this.objects.get(type)
        if (!typeMap.has(key)) {
            typeMap.set(key, callback())
        }
        return typeMap.get(key)
    }

    set(ref, key, value) {
        if (!this.objects.has(ref)) {
            this.objects.set(ref, new Map())
        }
        let typeMap = this.objects.get(ref)
        typeMap.set(key, value)
    }

    clean() {
        this.countes = new WeakMap()
    }

    nextCounter(ref) {
        if (!this.countes.has(ref)) {
            this.countes.set(ref, 0)
        }
        let count = this.countes.get(ref)
        this.countes.set(ref, count + 1)
        return count;

    }

    readNext(ref, callback) {
        const count = this.nextCounter(ref);
        return this.read(ref, count, callback)
    }
}

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'


export default class Future {
    constructor(fn) {
        const self = this
        self.status = PENDING // RESOLVED, REJECTED
        self.data = undefined
        self.onFulfilledCallback = []
        self.onRejectedCallback = []

        function resolve(data) {
            if (self.status === PENDING) {
                self.status = RESOLVED
                self.data = data
                for (let i = 0; i < self.onFulfilledCallback.length; i++) {
                    self.onFulfilledCallback[i](self.data)
                }
            }
        }

        function reject(data) {
            if (self.status = PENDING) {
                self.status = REJECTED
                self.data = data
                for (let i = 0; i < self.onRejectedCallback.length; i++) {
                    self.onRejectedCallback[i](self.data)
                }
            }
        }

        try {
            fn(resolve, reject);
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        const self = this

        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (v) { return v }
        onRejected = typeof onRejected === 'function' ? onRejected : function (r) { return r }

        if (self.status === PENDING) {
            return new Promise(function (resolve, reject) {
                self.onFulfilledCallback.push(function (value) {
                    try {
                        const ret = onFulfilled(value)

                        if (ret instanceof Promise) {
                            ret.then(resolve, reject)
                        } else {
                            resolve(ret)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
                self.onRejectedCallback.push(function (value) {
                    try {
                        const ret = onRejected(value)

                        if (ret instanceof Promise) {
                            ret.then(resolve, reject)
                        } else {
                            reject(ret)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }

        if (self.status === RESOLVED) {
            return new Promise(function (resolve, reject) {
                try {
                    const ret = onFulfilled(self.data)

                    if (ret instanceof Promise) {
                        ret.then(resolve, reject)
                    } else {
                        resolve(ret)
                    }
                } catch (e) {
                    reject(e)
                }
            })
        }

        if (self.status === REJECTED) {
            return new Promise(function (resolve, reject) {
                try {
                    const ret = onRejected(self.data)

                    if (ret instanceof Promise) {
                        ret.then(resolve, reject)
                    } else {
                        reject(ret)
                    }
                } catch (e) {
                    reject(e)
                }
            })
        }
    }
}


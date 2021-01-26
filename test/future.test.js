import { Future } from '../index.js'
const assert = require('assert')

describe('feature 单元测试', () => {
    function routine(res, delay) {
        return new Future(function(resolve, reject) {
            delay = delay || 0
            setTimeout(() => {
                if (!!res) {
                    resolve(true)
                } else {
                    reject(false)
                }
            }, delay)
        })
    }
    it('不等待 resolve', (done) => {
        routine(1).then(v => {
            // console.log('resolve')
        }, rej => {
            it('不等待，resolve错误', () => {
                assert.ok(false)
            });
        }).finally(() => {
            assert.ok(true)
            done()
        })
    });
    
    it('不等待 reject', (done) => {
        routine(0).then(v => {
            assert.ok(false)
        }, rej => {
            // console.log('reject')
        }).finally(() => {
            assert.ok(true)
            done()
        })
    })

    it('等待 resolve', (done) => {
        routine(1, 1000).then(v => {
            assert.ok(true)
        }, rej => {
            assert.ok(false)
        }).finally(() => {
            done()
        })
    });
    
    it('等待 reject', (done) => {
        routine(0, 1000).then(v => {
            assert.ok(false)
        }, rej => {
            assert.ok(true)
        }).finally(() => {
            done()
        })
    });
});
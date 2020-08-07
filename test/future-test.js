import Future from '../index'

function test() {
    const future = new Future(function(resolve, reject) {
        const i = 1
        if (i) {
            resolve(true)
        } else {
            reject(false)
        }
    }).then(v => {
        
    }, r => {

    })
}
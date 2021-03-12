function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            if (fn && typeof fn == 'function') {
                fn(...args)
            }
        }, delay);
    }
}

function throttle(fn, delay) {
    let timer = null;

    return function(...args) {
        if (timer == null) {
            fn();
            timer = setTimeout(() => {
                timer = null;
            }, delay);
        }
    }
}

export default debounce()


debounce(() => {
    console.log('hello', args)
}, 100)
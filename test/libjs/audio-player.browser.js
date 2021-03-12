window.onload = function() {
    console.log('onload')
    var globalAudio = new libjs.AudioPlayer();
    document.getElementById('audio1').addEventListener('click', function(e) {
        console.log('audio:', globalAudio, e.target.getAttribute('data'))
        let id = e.target.getAttribute('data')
        globalAudio.continue(id, () => {}, () => {}, id)
    })
    document.getElementById('audio2').addEventListener('click', function(e) {
        console.log('audio2:', globalAudio, e.target.getAttribute('data'))
        let id = e.target.getAttribute('data')
        globalAudio.continue(id, () => {}, () => {}, id)
    })
    document.getElementById('audio3').addEventListener('click', function(e) {
        console.log('audio3:', globalAudio, e.target.getAttribute('data'))
        let id = e.target.getAttribute('data')
        globalAudio.continue(id, () => {}, () => {}, id)
    })
}



(function() {
    const video = document.querySelector("video");
    if (!video) return;

    // Create overlay canvas
    const canvas = document.createElement("canvas");
    canvas.id = "yt-visualizer";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.style.position = "fixed";
    canvas.style.bottom = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "200px";
    canvas.style.zIndex = "9999";
    canvas.style.pointerEvents = "none";
    canvas.width = window.innerWidth;
    canvas.height = 200;

    // Setup Web Audio API
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(video);
    const analyser = audioCtx.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i];
            ctx.fillStyle = `rgb(${barHeight + 100},50,200)`;
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
        }
    }

    draw();
})();

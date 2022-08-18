const SHOW_CONTROL_POINTS = true

let hasSaved = false

function setup() {
    frameRate(10)
    angleMode('degrees')
    createCanvas(windowWidth, windowHeight, SVG)
}

function draw() {
    background(255)
    noFill()

    translate(width / 2, height / 2)
    drawBezier()

    // saveSVGFile()
}

function drawBezier() {
    const points = bezierPointsFromDestinationAngle(
        [0, 0], [
        [45, 200, 45, 100, 45, 100],
        [45, 300, "smooth", 100, 45, 100],
        [-45, 200, "smooth", 80, 45, 80],
    ]
    )

    for (let i = 0; i < points.length; i++) {
        if (SHOW_CONTROL_POINTS) {
            fill(255, 0, 0)
            circle(points[i][2], points[i][3], 5)
            fill(0, 255, 0)
            circle(points[i][4], points[i][5], 5)
        }
        noFill()
        bezier(points[i][0], points[i][1], points[i][2], points[i][3], points[i][4], points[i][5], points[i][6], points[i][7])
    }
}

function saveSVGFile() {
    if (!hasSaved) {
        save("p5_canvas.svg")
        hasSaved = true
    }
}
//使い方
// const points = bezierPointsFromDestinationAngle(
//   [startMatrixX: number, startMatrixY: number], [
//     [destinationAngle: number, destinationLength: number, startControlAngle: number | "smooth", startControlLength: number, destinationControlAngle: number, destinationControlLength: number],
//     [destinationAngle: number, destinationLength: number, startControlAngle: number | "smooth", startControlLength: number, destinationControlAngle: number, destinationControlLength: number],
//     [destinationAngle: number, destinationLength: number, startControlAngle: number | "smooth", startControlLength: number, destinationControlAngle: number, destinationControlLength: number]
//     ...
//   ]
// )
//
//

const bezierPointsFromDestinationAngle = (start, destinations) => {
  const x = start[0]
  const y = start[1]

  let points = []
  for (let i = 0; i < destinations.length; i++) {
    const startX = points.length === 0 ? x : points[points.length - 1][6]
    const startY = points.length === 0 ? y : points[points.length - 1][7]
    const destination = destinations[i]
    const destinationAngle = -destination[0]
    const destinationLength = destination[1]
    const startControlAngle = destination[2] === "smooth" ? -destinations[i - 1][0] - destinationAngle + destinations[i - 1][4] : -destination[2]
    const startControlLength = destination[3]
    const destinationControlAngle = -destination[4]
    const destinationControlLength = destination[5]

    const startControlX = startX + cos(destinationAngle + startControlAngle) * startControlLength
    const startControlY = startY + sin(destinationAngle + startControlAngle) * startControlLength
    const length = Math.sqrt(Math.pow(destinationLength, 2) + Math.pow(destinationControlLength, 2) - 2 * destinationLength * destinationControlLength * cos(destinationControlAngle))
    const theta = asin(sin(destinationControlAngle) / length * destinationControlLength)
    const destinationControlX = startX + cos(theta + destinationAngle) * length
    const destinationControlY = startY + sin(theta + destinationAngle) * length
    const destinationX = startX + cos(destinationAngle) * destinationLength
    const destinationY = startY + sin(destinationAngle) * destinationLength
    points.push([startX, startY, startControlX, startControlY, destinationControlX, destinationControlY, destinationX, destinationY])
  }

  return points
}

// const bezierPointsFromDestinationMatrix = (start, destinations) => {
//   const x = start[0]
//   const y = start[1]

//   let points = []
//   for (let i = 0; i < destinations.length; i++) {
//     const destination = destinations[i]
//     const startX = points.length === 0 ? x : points[points.length - 1][0]
//     const startY = points.length === 0 ? y : points[points.length - 1][1]
//     const destinationX = destination[0]
//     const destinationY = destination[1]
//     const destinationAngle = atan((destinationY - startY) / (destinationX - startX))
//     const startControlAngle = destination[2] === "smooth" ? destinations[i - 1][2] + destinationAngle - destinations[i - 1][4] : destination[2]
//     const startControlLength = destination[3]
//     const destinationControlAngle = destination[4]
//     const destinationControlLength = destination[5]

//     const startControlX = cos(destinationAngle + startControlAngle) * startControlLength
//     const startControlY = sin(destinationAngle + startControlAngle) * startControlLength
//     const destinationControlX = cos(-(180 - destinationAngle + destinationControlAngle)) * destinationControlLength
//     const destinationControlY = sin(-(180 - destinationAngle + destinationControlAngle)) * destinationControlLength
//     points.push([startX, startY, startControlX, startControlY, destinationControlX, destinationControlY, destinationX, destinationY])
//   }

//   return points
// }

const cos = (angle) => {
  return Math.cos(angle * Math.PI / 180)
}

const sin = (angle) => {
  return Math.sin(angle * Math.PI / 180)
}

const atan = (x) => {
  return Math.atan(x) * 180 / Math.PI
}

const asin = (x) => {
  return Math.asin(x) * 180 / Math.PI
}
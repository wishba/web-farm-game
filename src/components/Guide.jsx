import React from 'react'
import './Guide.css'

function Guide() {
  const tileDimension = [7, 7]
  const guideArray = []

  for (let indexY = 0; indexY < tileDimension[1]; indexY++) {
    for (let indexX = 0; indexX < tileDimension[0]; indexX++) {
      guideArray.push(<div key={`${indexX} / ${indexY}`} className='guide__tile'>{indexX - Math.floor(tileDimension[0] / 2)}/{indexY - Math.floor(tileDimension[1] / 2)}</div>)
    }
    guideArray.push(<br key={`key ${indexY}`} />)
  }

  return (
    <div className='guide' style={{
      transform: `
        translate(
          calc(${Math.floor(tileDimension[0] / 2)} * var(--tile-size) * -1),
          calc(${Math.floor(tileDimension[1] / 2)} * var(--tile-size) * -1)
        )
      `
    }}>{guideArray}</div>
  )
}

export default Guide
import React, { useRef, useState } from 'react'
import './Asset.css'

function Asset({ asset, position, tile }) {
  const assetRef = useRef()
  const [assetWidth, setAssetWidth] = useState()

  return (
    <div className='asset' style={{
      transform: `translate(calc(${position[0]} * var(--tile-size)), calc(${position[1]} * var(--tile-size)))`,
    }}>
      {asset === '' ?
        (<div className='asset__empty'></div>)
        :
        (<img
          onLoad={() => {
            setAssetWidth(assetRef.current.offsetWidth)
          }}
          ref={assetRef}
          style={{
            width: `calc(${assetWidth}px * var(--zoom-level))`,
            transform: `translate(calc(${tile[0] * -1} * var(--tile-size)), calc(${tile[1] * -1} * var(--tile-size)))`,
          }}
          src={asset}
        />)
      }
    </div>
  )
}

export default Asset
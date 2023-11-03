import { forwardRef } from "react"
import FogEffect from "./FogEffect.jsx"

export default forwardRef(function Fog (props, ref){
    const effect = new FogEffect(props)
    return <primitive ref={ref} object={effect} />
}) 

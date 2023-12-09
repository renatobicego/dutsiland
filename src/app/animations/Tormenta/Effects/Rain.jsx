import { forwardRef } from "react"
import RainEffect from "./RainEffect.jsx"

export default forwardRef(function Rain (props, ref){
    const effect = new RainEffect(props)
    return <primitive ref={ref} object={effect} />
}) 
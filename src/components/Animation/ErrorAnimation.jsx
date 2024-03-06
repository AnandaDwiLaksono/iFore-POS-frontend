import { Player, Controls } from "@lottiefiles/react-lottie-player"

import error from "../../assets/json/error.json"

const ErrorAnimation = () => {
  return (
    <div className="grid place-items-center mx-auto border">
      <Player
        autoplay
        speed={1.5}
        loop
        src={error}
        style={{ height: "300px", width: "300px" }}>
        <Controls visible={false} />
      </Player>
    </div>
  )
}

export default ErrorAnimation

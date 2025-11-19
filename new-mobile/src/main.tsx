import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { registerSW } from "virtual:pwa-register"
import "./index.css"
import App from "./App.tsx"

declare global {
  interface Window {
    __sghAppHeightSetup?: boolean
  }
}

const APP_HEIGHT_VAR = "--app-height"

const setAppHeight = () => {
  const viewportHeight =
    window.visualViewport?.height ??
    window.innerHeight ??
    document.documentElement.clientHeight
  document.documentElement.style.setProperty(APP_HEIGHT_VAR, `${viewportHeight}px`)
}

const setupAppHeight = () => {
  if (window.__sghAppHeightSetup) return
  window.__sghAppHeightSetup = true
  setAppHeight()
  window.addEventListener("resize", setAppHeight)
  window.addEventListener("orientationchange", setAppHeight)
  window.visualViewport?.addEventListener("resize", setAppHeight)
  window.visualViewport?.addEventListener("scroll", setAppHeight)
}

if ("serviceWorker" in navigator) {
  registerSW({ immediate: true })
}

setupAppHeight()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

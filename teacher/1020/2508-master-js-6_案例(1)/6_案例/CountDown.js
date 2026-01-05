class CountDown {
  constructor({ el, time, onEnd }) {
    this.el = el
    this.time = time
    this.onEnd = onEnd
    this.init()
  }
  init() {
    if (this.time > 0) {
      this.renderTime()
      this.intervalId = setInterval(() => {
        this.time -= 1000
        if (this.time <= 0) {
          this.time = 0
          this.stop()
          this.onEnd && this.onEnd()
        }
        this.renderTime()
      }, 1000)
    }
  }
  renderTime() {
    const h = this.addZero(Math.floor(this.time / 1000 / 60 / 60))
    const m = this.addZero(Math.floor(this.time / 1000 / 60 % 60))
    const s = this.addZero(Math.floor(this.time / 1000 % 60))
    this.el.innerHTML = `${h}:${m}:${s}`
  }
  addZero(n) {
    return n < 10 ? '0' + n : n
  }
  stop() {
    clearInterval(this.intervalId)
  }
}
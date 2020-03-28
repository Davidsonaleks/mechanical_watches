type TClockProps = {
  hourEl: HTMLElement | null
  minuteEl: HTMLElement | null
  secondEl: HTMLElement | null
}

class Clock {
  hourEl: HTMLElement | null
  minuteEl: HTMLElement | null
  secondEl: HTMLElement | null
  timeout: NodeJS.Timeout | null = null

  constructor(props: TClockProps) {
    this.hourEl = props.hourEl
    this.minuteEl = props.minuteEl
    this.secondEl = props.secondEl
  }

  get hours() {
    return new Date().getHours()
  }
  get minutes() {
    return new Date().getMinutes()
  }
  get seconds() {
    return new Date().getSeconds()
  }

  render() {
    if (!this.hourEl || !this.minuteEl || !this.secondEl) return
    this.secondEl.style.transform = `rotate(${this.seconds * 6}deg)`
    this.minuteEl.style.transform = `rotate(${this.minutes * 6}deg)`
    this.hourEl.style.transform = `rotate(${(this.hours * 60 + this.minutes) / 2}deg)`
  }

  start() {
    this.render()
    this.timeout = setInterval(() => this.render(), 1000)
  }
  stop() {
    clearInterval(this.timeout as NodeJS.Timeout)
  }
}

const clock = new Clock({
  hourEl: document.querySelector(".clock__hour"),
  minuteEl: document.querySelector(".clock__minute"),
  secondEl: document.querySelector(".clock__second"),
})

clock.start()

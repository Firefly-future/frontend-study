class EventBus {
  eventList = {}
  on(eventName, callback) {
    this.eventList[eventName] = callback
  }
  emit(eventName, ...args) {
    if (this.eventList[eventName]) {
      this.eventList[eventName](...args)
    }
  }
}


// eventBus\发布订阅模式\事件总线
const event = new EventBus()

export default event
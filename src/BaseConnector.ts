import { nanoid } from 'nanoid'

class BaseConnector<OptionsType = any> {
  id: string
  app?: any
  eventConfigurations: { [eventId: string]: any }
  started: boolean
  options?: OptionsType

  constructor(options?: OptionsType, id?: string) {
    this.id = id || nanoid()
    this.eventConfigurations = {}
    this.started = false
    this.options = options
  }

  updateOptions(options: OptionsType) {
    this.options = options
    this.onUpdateOptions(options)
  }

  onUpdateOptions(options: OptionsType) {
    // Override this method if you need to do something specific on update options
  }

  removeEvent(event: any) {
    delete this.eventConfigurations[event.id]
    this.onRemoveEvent(event)
  }

  onRemoveEvent(event: any) {
    // Override this method if you need to do something specific on remove events
  }

  start(app: any) {
    this.app = app
    if (!this.started) {
      this.onStart(app)
    }
    this.started = true
  }

  onStart() {
    // Override this method if you need to do something specific on start
  }

  stop() {
    this.started = false
    this.onStop()
  }

  onStop() {
    // Override this method if you need to do something specific on stop
  }
}

export default BaseConnector

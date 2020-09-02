import { nanoid } from 'nanoid'
import { Reshuffle } from './types'
import { EventConfiguration } from './'

class BaseConnector<OptionsType = any> {
  id: string
  app?: Reshuffle
  eventConfigurations: { [eventId: string]: EventConfiguration }
  started: boolean
  options?: OptionsType

  constructor(options?: OptionsType, id?: string) {
    this.id = id || nanoid()
    this.eventConfigurations = {}
    this.started = false
    this.options = options
  }

  updateOptions(options: OptionsType) {
    // Override this method if you need to do something specific on update options
    this.options = options
  }

  removeEvent(event: EventConfiguration) {
    delete this.eventConfigurations[event.id]
    this.onRemoveEvent(event)
  }

  onRemoveEvent(event: EventConfiguration) {
    // Override this method if you need to do something specific on remove events
  }

  start(app: Reshuffle) {
    this.app = app
    if (!this.started) {
      this.onStart(app)
    }
    this.started = true
  }

  onStart(app: Reshuffle) {
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

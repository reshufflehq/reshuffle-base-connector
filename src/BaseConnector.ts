import { nanoid } from 'nanoid'
import { Reshuffle } from './types'
import { EventConfiguration } from './'

class BaseConnector<ConfigOptionsType = any, EventOptionsType = any> {
  id: string
  app?: Reshuffle
  eventConfigurations: { [eventId: string]: EventConfiguration }
  started: boolean
  configOptions?: ConfigOptionsType

  constructor(configOptions?: ConfigOptionsType, id?: string) {
    this.id = id || nanoid()
    this.eventConfigurations = {}
    this.started = false
    this.configOptions = configOptions
  }

  updateOptions(configOptions: ConfigOptionsType) {
    // Override this method if you need to do something specific on update configOptions
    this.configOptions = configOptions
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

  on(options: EventOptionsType, eventId: EventConfiguration['id']): EventConfiguration {
    throw new Error('on method must be implemented')
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

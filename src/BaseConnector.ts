import { nanoid } from 'nanoid'
import { Reshuffle } from './types'
import { EventConfiguration } from './'

class BaseConnector<ConfigOptionsType = any, EventOptionsType = any> {
  id: string
  app: Reshuffle
  eventConfigurations: { [eventId: string]: EventConfiguration }
  started: boolean
  configOptions?: ConfigOptionsType

  constructor(app: Reshuffle, configOptions?: ConfigOptionsType, id?: string) {
    this.app = app
    this.id = id || nanoid()
    this.eventConfigurations = {}
    this.started = false
    this.configOptions = configOptions
    app.register(this)
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

  start() {
    if (!this.started) {
      this.onStart()
    }
    this.started = true
  }

  onStart() {
    // Override this method if you need to do something specific on start
  }

  on(
    options: EventOptionsType,
    handler?: any,
    eventId?: EventConfiguration['id'],
  ): EventConfiguration | null {
    console.log('The on method is not implemented for this connector')
    return null
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

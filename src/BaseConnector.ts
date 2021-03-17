/* eslint-disable @typescript-eslint/no-unused-vars */
import { nanoid } from 'nanoid'
import { ReshuffleBase } from './types'
import { EventConfiguration, HandlerWrapper } from './'
import { Handler } from './types'

class BaseConnector<
  ConfigOptionsType = Record<string, any> | null,
  EventOptionsType = Record<string, any> | null
> {
  id: string
  app: ReshuffleBase
  eventConfigurations: { [eventId: string]: EventConfiguration }
  started: boolean
  configOptions?: ConfigOptionsType

  constructor(app: ReshuffleBase, configOptions?: ConfigOptionsType, id?: string) {
    this.app = app
    this.id = id || nanoid()
    this.eventConfigurations = {}
    this.started = false
    this.configOptions = configOptions
    app.register(this)
  }

  updateOptions(configOptions: ConfigOptionsType): void {
    // Override this method if you need to do something specific on update configOptions
    this.configOptions = configOptions
  }

  removeEvent(event: EventConfiguration): void {
    delete this.eventConfigurations[event.id]
    this.onRemoveEvent(event)
  }

  onRemoveEvent(event: EventConfiguration): void {
    // Override this method if you need to do something specific on remove events
  }

  start(): void {
    if (!this.started) {
      this.onStart()
    }
    this.started = true
  }

  onStart(): void {
    // Override this method if you need to do something specific on start
  }

  on(
    options: EventOptionsType,
    handler?: Handler,
    eventId?: EventConfiguration['id'],
  ): EventConfiguration | null {
    console.log('The on method is not implemented for this connector')
    return null
  }

  stop(): Promise<void> | void {
    this.started = false
    this.onStop()
  }

  onStop(): Promise<void> | void {
    // Override this method if you need to do something specific on stop
  }

  validateURL(url?: string, errorMessage?: string): string {
    if (typeof url !== 'string') {
      throw new Error(errorMessage || `Invalid url: ${url}`)
    }
    const match = url.match(/^(https:\/\/[\w-]+(\.[\w-]+)*(:\d{1,5})?)\/?$/)
    if (!match) {
      throw new Error(errorMessage || `Invalid url: ${url}`)
    }
    return match[1]
  }
}

export default BaseConnector

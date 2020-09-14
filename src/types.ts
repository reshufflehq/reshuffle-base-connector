import BaseConnector from './BaseConnector'
import BaseHttpConnector from './BaseHttpConnector'
import EventConfiguration from './EventConfiguration'
import { Logger } from 'winston'

export type Updater = (value: any) => Promise<any>

export type Handler = {
  handle: (event?: EventConfiguration) => void
  id: string
}

export type PersistentStore = {
  del: (key: string) => Promise<void>
  get: (key: string) => Promise<any>
  list: () => Promise<string[]>
  set: (key: string, value: any) => Promise<any>
  update: (key: string, updater: Updater) => Promise<any[]>
  validateKey: (key: string) => void
  validateValue: (value: any) => void
}

export interface Reshuffle {
  getConnector: (connectorId: BaseConnector['id']) => BaseConnector
  when: (eventConfiguration: EventConfiguration, handler: (() => void) | Handler) => Reshuffle
  register: (connector: BaseConnector) => Reshuffle
  registerHTTPDelegate: (path: string, delegate: BaseHttpConnector) => Reshuffle
  unregisterHTTPDelegate: (path: string) => void

  handleEvent: (eventName: string, event: any) => Promise<boolean>

  getPersistentStore: () => PersistentStore

  getLogger: () => Logger
}

import BaseConnector from './BaseConnector'
import BaseHttpConnector from './BaseHttpConnector'
import EventConfiguration from './EventConfiguration'

export type Updater = (value: any) => Promise<any>

export type Handler = {
  handle: (event?: any) => void
  id: string
}

export type PersistentStore = {
  del: (key: string) => Promise<void>
  get: (key: string) => Promise<any>
  list: () => Promise<string[]>
  set: (key: string, value: any) => Promise<any>
  update: (key: string, updater: Updater) => Promise<any[]>
}

export type Reshuffle = {
  register: (connector: BaseConnector) => BaseConnector
  unregister: (connector: BaseConnector) => Promise<void>

  getConnector: (connectorId: BaseConnector['id']) => BaseConnector
  when: (eventConfiguration: EventConfiguration, handler: () => void | Handler) => void

  registerHTTPDelegate: (path: string, delegate: BaseHttpConnector) => BaseHttpConnector
  unregisterHTTPDelegate: (path: string) => void

  start: (port?: number, callback?: () => void) => void
  restart: (port?: number) => void

  handleEvent: (eventName: string, event: any) => Promise<boolean>

  setPersistentStore: (adapter: PersistentStore) => PersistentStore
  getPersistentStore: () => PersistentStore

  clearInterval: (intervalID: NodeJS.Timer) => void
  setInterval: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => NodeJS.Timer
}

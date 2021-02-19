import BaseConnector from './BaseConnector'
import BaseHttpConnector from './BaseHttpConnector'
import EventConfiguration from './EventConfiguration'
import { Logger } from 'winston'

export type Updater = (value: any) => Promise<any>

export interface Handler {
  handle: (event: ReshuffleEvent, app: ReshuffleBase) => Promise<boolean>
  id: string
}

export type ReshuffleRequest<T> = T & { originalPath: string }
export type ReshuffleResponse<T> = T
export type ReshuffleEvent<RQ = Record<string, any>, RS = Record<string, any>> = {
  req: ReshuffleRequest<RQ>
  res: ReshuffleResponse<RS>
} & EventConfiguration

export type PersistentStore = {
  del: (key: string) => Promise<void>
  get: (key: string) => Promise<any>
  list: () => Promise<string[]>
  set: (key: string, value: any) => Promise<any>
  update: (key: string, updater: Updater) => Promise<any[]>
  validateKey: (key: string) => void
  validateValue: (value: any) => void
}

export interface ReshuffleBase {
  getConnector: (connectorId: BaseConnector['id']) => BaseConnector
  when: (eventConfiguration: EventConfiguration, handler: Handler) => ReshuffleBase
  register: (connector: BaseConnector) => ReshuffleBase
  registerHTTPDelegate: (path: string, delegate: BaseHttpConnector) => ReshuffleBase
  unregisterHTTPDelegate: (path: string) => void

  handleEvent: (eventName: string, event: ReshuffleEvent) => Promise<boolean>

  getPersistentStore: () => PersistentStore

  getLogger: () => Logger
}

import BaseConnector from './BaseConnector'

class EventConfiguration {
  id: string
  connector: BaseConnector
  options: Record<string, any>

  constructor(id: string, connector: BaseConnector, options: Record<string, any>) {
    this.id = id
    this.connector = connector
    this.options = options
  }

  do(handler: any) {
    this.connector.app?.when(this, handler)
  }
}

export default EventConfiguration

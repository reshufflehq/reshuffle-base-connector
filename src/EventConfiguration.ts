import Connector from './Connector'

class EventConfiguration {
  id: string
  connector: Connector
  options: Record<string, any>

  constructor(id: string, connector: Connector, options: Record<string, any>) {
    this.id = id
    this.connector = connector
    this.options = options
  }

  do(handler: any) {
    this.connector.app?.when(this, handler)
  }
}

export default EventConfiguration

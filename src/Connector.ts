import { nanoid } from 'nanoid'

class Connector<OptionsType = any> {
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

  start(app: any) {
    throw new Error('start function needs to be implemented in your connector implementation')
  }

  stop() {
    throw new Error('stop function needs to be implemented in your connector implementation')
  }

  async handle(...args: any[]) {
    throw new Error('handle function needs to be implemented in your connector implementation')

    return false
  }
}

export default Connector

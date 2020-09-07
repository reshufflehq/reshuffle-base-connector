import { Request, Response, NextFunction } from 'express'
import { BaseConnector } from './'

class BaseHttpConnector<ConfigOptionsType = any, EventOptionsType = any> extends BaseConnector {
  constructor(options?: ConfigOptionsType, id?: string) {
    super(options, id)
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    throw new Error('handle function needs to be implemented in your Http connector implementation')
    return false
  }
}

export default BaseHttpConnector

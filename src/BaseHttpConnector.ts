import { Request, Response, NextFunction } from 'express'
import { Reshuffle } from './types'
import { BaseConnector } from './'

class BaseHttpConnector<ConfigOptionsType = any, EventOptionsType = any> extends BaseConnector {
  constructor(app: Reshuffle, options?: ConfigOptionsType, id?: string) {
    super(app, options, id)
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    throw new Error('handle function needs to be implemented in your Http connector implementation')
    return false
  }
}

export default BaseHttpConnector

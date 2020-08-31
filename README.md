# reshuffle-base-connector
Base class for Reshuffle Connectors

## Get started
To implement a new connector, create a new class extending the Connector claass from this package

Example:
```js
import { Connector } from 'reshuffle-base-connector'

class myCustomConnector extends Connector {
    
  constructor(id /* your custom options */) {
    super(id)
    // Set your custom options here
  }
    
  start(app) {
    // implements your start function here
  }
    
  stop() {
    // implements your stop function here
  }
    
  async handle() {
    // implements your handle function here
  }
}
```
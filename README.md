# reshuffle-base-connector
Base class for Reshuffle Connectors

## Get started
To implement a new connector, create a new class extending the BaseConnector class from this package.

Example:
```js
import { BaseConnector } from 'reshuffle-base-connector'

class MyCustomConnector extends BaseConnector {
    
  constructor(id /* your custom options */) {
    super(id)
    // Set your custom options here
  }
    
  start(app) {
    // implement your start function here
  }
    
  stop() {
    // implement your stop function here
  }
    
  async handle() {
    // implement your handle function here
  }
}
```
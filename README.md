# reshuffle-base-connector
Base class for Reshuffle Connectors

## Get started
To implement a new connector, create a new class extending the BaseConnector class from this package.

Example:
```js
import { BaseConnector } from 'reshuffle-base-connector'

class MyCustomConnector extends BaseConnector<MyConnectorConfigOptions, MyConnectorEventOptions> {
    
  constructor(options, id /* your custom options */) {
    super(id)
    // Set your custom options here
  }
    
  onStart(app) {
    // ...
  }
    
  onStop() {
    // ...
  }
 
  on(options: EventOptionsType, eventId: EventConfiguration['id']): EventConfiguration {
    // ...
  }

}
```
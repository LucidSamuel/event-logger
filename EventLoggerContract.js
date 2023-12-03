import {
    SmartContract,
    method,
    state,
    State,
    Field,
    PrivateKey,
    PublicKey,
    Party,
  } from 'o1js';
  
  class EventLoggerContract extends SmartContract {
    @state(Field) lastEvent = State<Field>();
    @state(PublicKey) registeredDevice = State<PublicKey>();
  
    // Initialize with the device's public key
    init(devicePublicKey: PublicKey) {
      super.init();
      this.registeredDevice.set(devicePublicKey);
    }
  
    // Method to log an event from the IoT device
    @method logEvent(devicePrivateKey: PrivateKey, eventData: Field) {
      const devicePublicKey = devicePrivateKey.toPublicKey();
  
      // Verify if the device is registered
      devicePublicKey.equals(this.registeredDevice.get()).assertEquals(true);
  
      // Log the event
      this.lastEvent.set(eventData);
    }
  }
  
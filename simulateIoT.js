async function simulateIoT() {
  
    const devicePrivateKey = PrivateKey.random();
    const devicePublicKey = devicePrivateKey.toPublicKey();
    const eventData = Field(Math.floor(Math.random() * 1000)); // Random event data
  
    const mina = Mina.LocalBlockchain();
    Mina.setActiveInstance(mina);
  
    const account = mina.addAccount(devicePrivateKey);
    const eventLogger = new EventLoggerContract(account.publicKey);
  
    // Deploy the contract
    await eventLogger.deploy({ fee: mina.standardFee, from: account });
  
    // Log an event
    await eventLogger.logEvent({ from: account, fee: mina.standardFee }, devicePrivateKey, eventData);
  
    console.log(`Event logged: ${eventData}`);
  }
    
const logger = require("./logger");

class SyncedStore {
  constructor() {
    this.init();
  }

  init() {
    logger.debug("init SyncedStore");
  }
}

module.exports = SyncedStore;

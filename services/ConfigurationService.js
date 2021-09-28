class ConfigurationService {
  constructor(model) {
    this.model = model; //configuration page model
  }

  //id = path name
  getById(id) {
    const configuration = this.model.hasOwnProperty(id)
      ? this.model[`${id}`]
      : false;
    return configuration;
  }
}

module.exports = ConfigurationService;

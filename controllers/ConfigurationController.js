class ConfigurationController {
  constructor(configurationService) {
    this.configurationService = configurationService;
  }

  /*
  returns:
    200 if configuration exists
    404 if configuration doesn't exists
  */
  get(req, res) {
    const { params } = req;
    const { path } = params;
    const result = this.configurationService.getById(path);
    if (result) {
      //console.log("result imprime: ", result);
      return res.status(200).json(result);
    }
    return res.sendStatus(404);
  }
}

module.exports = ConfigurationController;

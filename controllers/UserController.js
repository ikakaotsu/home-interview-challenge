class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async create(req, res) {
    const { body } = req;
    try {
      const created = await this.userService.create(body);
      if (created) {
        return res.status(201).json(created);
      }
      return res.sendStatus(400);
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  }

  async findAll(req, res) {
    const { query } = req;
    let select = "";
    if (query.select) {
      select = query.select.split(",");
      delete query.select;
    }
    console.log(query);
    const results = await this.userService.find(query, select);
    if (results) {
      return res.status(200).json(results);
    }
    return res.sendStatus(400);
  }

  async findOne(req, res) {
    const { username, password } = req.body;
    //console.log("Imprime de imprimir", username);
    const result = await this.userService.findOne(username);
    if (result) {
      return res.json(result);
    }
    return res.sendStatus(400);
  }
}

module.exports = UserController;

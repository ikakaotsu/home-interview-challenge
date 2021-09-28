class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  create(data) {
    console.log(data);
    const user = new this.userModel(data);
    return user.save();
  }

  find(data = {}, select = "", params = { lean: true }) {
    const results = this.userModel.find(data).select(select).exec();
    return results;
  }

  findOne(username = {}) {
    const result = this.userModel.findOne({ username }, "id username").exec();
    return result;
  }
}

module.exports = UserService;

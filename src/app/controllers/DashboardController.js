const {
  User
} = require('../models')
class DashboardControler {
  async index (req, res) {
    const providers = await User.findAll({
      where: {
        provider: true
      }
    })
    return res.render('dashboard', {
      providers
    })
  }
}

module.exports = new DashboardControler()

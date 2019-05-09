const {
  User
} = require('../models')
class SessionController {
  async create (req, res) {
    res.render('auth/signin')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }

  async store (req, res) {
    const {
      email,
      password
    } = req.body

    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      console.log('Usuario não encontrado')
      req.flash('error', 'Usuario não encontrado')
      return res.redirect('/')
    }

    if (!await user.checkPassword(password)) {
      console.log('Senha incorreta')
      req.flash('error', 'Senha incorreta')

      return res.redirect('/')
    }

    req.session.user = user
    return res.redirect('/app/dashboard')
  }
}

module.exports = new SessionController()

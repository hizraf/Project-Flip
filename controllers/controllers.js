const { Hastag, Profile, Tweet, TweetHastag, User } = require('../models/index');

class Controller {

  static home(req, res) {
    res.redirect('/login');
  }

  static login(req, res) {
    res.render('login');
  }

  static postlogin(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then((data) => {
        if (data) {
          if (data.email === email) {
            res.send('Berhasil Login');
          }
        }
        else {
          res.redirect('/login?error=email-not-found');
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static home(req, res) {
    Tweet.findAll({
      include: [
        {
          model: Hastag
        },
        {
          model: User,
          include: {
            model: Profile
          }
        }
      ]
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }




}

module.exports = Controller;
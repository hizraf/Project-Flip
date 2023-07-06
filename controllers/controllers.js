const { Hastag, Profile, Tweet, TweetHastag, User } = require('../models/index');
const bcrypt = require('bcryptjs');
const { helpers } = require('../helpers/helper');
class Controller {

  static home(req, res) {
    res.redirect('/login');
  }

  static login(req, res) {
    let errors = [];
    if (req.query.error) {
      errors.push(req.query.error);
    }
    // console.log(errors);
    return res.render('login', { errors });
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
          const validPass = bcrypt.compareSync(password, data.password);
          if (validPass) {
            req.session.userId = data.id;
            req.session.role = data.role;
            let role = req.session.role;
            let id = req.session.userId;

            // res.render('tweets', { role, id });
            return res.redirect(`/tweets`);
          }
          else {
            res.redirect('/login?error=password-invalid');
          }
        }
        else {
          res.redirect('/login?error=account-not-found');
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static tweets(req, res) {
    const { search } = req.query;
    Tweet.findByText(search, Hastag, Profile, User)
      .then((data) => {
        res.render('tweets', { data, id: req.session.userId, role: req.session.role, helpers });
        // res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getRegister(req, res) {
    let error;
    if (req.query.error) {
      let error = req.query.error;
      res.render('register', { error });
    }
    else {
      res.render('register', { error });
    }
  }

  static postRegister(req, res) {

    const { email, password } = req.body;

    User.create({ email, password, role: User.autoUser() })
      .then(() => {
        res.redirect('/login');
      })
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
          res.redirect(`/register?error=${err.errors[0].message}`);
        }
        else {
          res.send(err);
        }


      });
  }

  static getAddTweet(req, res) {
    let error;
    if (req.query.error) {
      error = req.query.error;
    }

    Hastag.findAll()
      .then((data) => {
        res.render('add', { data, error });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postAddTweet(req, res) {
    if (req.query.error) {
      error = req.query.error;
    }

    // res.send(req.body);
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.imageUrl;
    uploadPath = './public/images/' + sampleFile.name;


    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
      if (err)
        return res.status(500).send(err);
      console.log(sampleFile);
      let imageUrl = `http://localhost:3000/images/${sampleFile.name}`;
      // console.log(imageUrl, req.body);
      let newTweet;
      if (!req.body.text || !req.body.tags) {
        res.redirect('/addTweet?error=please input all ');
      }
      else {
        Tweet.create({
          text: req.body.text,
          imageUrl,
          UserId: req.session.userId
        })
          .then((tweet) => {
            newTweet = tweet;
            return Hastag.findAll({
              where: {
                id: req.body.tags
              }
            })
              .then((tags) => {
                return newTweet.addHastags(tags);
              })
              .then(() => {
                res.redirect('/tweets');
              });
          })
          .catch((err) => {
            res.send(err);
          });
      }


    });
  }

  static getProfile(req, res) {
    let error;
    if (req.query.error) {
      error = req.query.error;
    }

    Profile.findOne({
      where: {
        UserId: req.session.userId
      }
    })
      .then((data) => {
        res.render('profiles', { data, error });
        // console.log(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static insertProfile(req, res) {
    const { firstName, lastName, birthOfDate, gender } = req.body;
    const UserId = req.session.userId;
    Profile.create({ firstName, lastName, birthOfDate, gender, UserId })
      .then(() => {
        res.redirect('/tweets');
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postUpdate(req, res) {
    const { firstName, lastName, birthOfDate, gender } = req.body;
    const UserId = req.session.userId;
    Profile.update({ firstName, lastName, birthOfDate, gender }, {
      where: {
        UserId
      }
    })
      .then(() => {
        res.redirect('/tweets');
      })
      .catch((err) => {
        let error = '';
        if (err.name === "SequelizeValidationError") {
          err.errors.forEach(e => {
            error += `, ${e.message}`;
          });
          res.redirect(`/profile?error=${error}`);
        }
        else {
          res.send(err);
        }
      });
  }

  static delete(req, res) {
    const { id } = req.params;
    Tweet.destroy({
      where: {
        id
      }
    })
      .then(() => {
        res.redirect('/tweets');
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Server Error');
      } else {
        res.redirect('/login');
      }
    });
  }






}

module.exports = Controller;
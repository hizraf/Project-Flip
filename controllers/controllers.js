const { Hastag, Profile, Tweet, TweetHastag, User } = require('../models/index');
const bcrypt = require('bcryptjs');
class Controller {

  static home(req, res) {
    res.redirect('/login');
  }

  static login(req, res) {
    let errors = [];
    if (req.query.error) {
      errors.push(req.query.error);
    }
    console.log(errors);
    res.render('login', { errors });
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

            return res.redirect(`/tweets?id=${req.session.userId}&role=${req.session.role}`);
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
        res.render('tweets', { data });
        // res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getRegister(req, res) {
    res.render('register');
  }

  static postRegister(req, res) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(() => {
        res.redirect('/login');
      })
      .catch((err) => {
        res.send(err);
        console.log(err);
      });
  }

  static getAddTweet(req, res) {
    res.render('add');
  }

  static postAddTweet(req, res) {
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
      res.send(imageUrl);
    });
  }





}

module.exports = Controller;
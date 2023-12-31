const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          model: Post
        },
      ]
    });

    res.status(200).json(userData);

  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(req.session);
          });
  
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username }});

        if(!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again '});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword)  {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true,
          console.log(req.session);
            res.json({ user: userData, message: 'You are now logged in'});
        });

    } catch (err) {

    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Post }]
    })

    const user = userData.get({ plain: true });
    res.status(200).json(user)

  } catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;
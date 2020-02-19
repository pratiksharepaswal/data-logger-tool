const express = require('express');
const router = express.Router();
const Video = require('../models/Videos')
var Log = require('../models/Log');
const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get("/demo-video", (req, res) => res.render('video'))

router.post("/", (req, res) => {
  let {
    log_type,
    message
  } = req.body
  let log = {
    log_type,
    message
  }
  if (req.isAuthenticated()) {
    log.user = req.user._id
  }
  let new_log = new Log(log)
  new_log.save((err, l) => {
    if (err) {
      console.log(err)
      return res.send({
        success: false,
        message: "Internal server error"
      })
    }
    return res.send({
      success: true
    })
  })
})

//CLICKSTREAMS

//welcomepage clickstream
router.post('/registerbar', async (req, res) => {
  try {
    let savedLog = await new Log({
      log_type: "click",
      message: "User Clicked on Register Bar",
      // user: user_id
    }).save()
    if (savedLog) {
      console.log()
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(err)
  }
});

router.post('/loginbar', async (req, res) => {
  try {
    let savedLog = await new Log({
      log_type: "click",
      message: "User Clicked on Login Bar",
    }).save()
    if (savedLog) {
      console.log()
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(err)
  }


});

//registerpage clickstream

router.post('/name', async (req, res) => {
  try {
    let savedLog = await new Log({
      log_type: "write",
      message: "User inserting name on register page",
    }).save()
    if (savedLog) {
      console.log()
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(err)
  }


});
router.post('/email', async (req, res) => {
  try {
    let savedLog = await new Log({
      log_type: "write",
      message: "User inserting Email on register page",
    }).save()
    if (savedLog) {
      console.log()
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(err)
  }


});
router.post('/password', async (req, res) => {
  try {
    let savedLog = await new Log({
      log_type: "write",
      message: "User inserting password on register page",
    }).save()
    if (savedLog) {
      console.log()
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(err)
  }


});

router.post('/password2', async (req, res) => {
  try {
    let savedLog = await new Log({
      log_type: "write",
      message: "User confirming password on register page",
    }).save()
    if (savedLog) {
      console.log()
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(err)
  }


});

router.post('/login-regis', async (req, res) => {
  try {
    let savedLog = await new Log({
      log_type: "click",
      message: "User clicked on login button on register page",
    }).save()
    if (savedLog) {
      console.log()
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(err)
  }


});


// login page clickstream
router.post('/emailinfo', async (req, res) => {
  try {
    let savedLog = await new Log({
      log_type: "write",
      message: "User filling email info on login page",
    }).save()
    if (savedLog) {
      console.log()
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(err)
  }


});
router.post('/passwordinfo', async (req, res) => {
  try {
    let savedLog = await new Log({
      log_type: "write",
      message: "User filling password info on login page",
    }).save()
    if (savedLog) {
      console.log()
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(err)
  }


});
router.post('/regis-login', async (req, res) => {
  try {
    let savedLog = await new Log({
      log_type: "click",
      message: "User clicked on Register button on login page",
    }).save()
    if (savedLog) {
      console.log()
    }
    res.sendStatus(200)
  } catch (error) {
    console.log(err)
  }


});



//clickstreams of Dashboard
//saving contact page clickstream in DB
router.post('/contactpage', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User clicked on Contact page",
      user: user_id
    }).save()
  }

});

//saving assesment page clickstream in DB
router.post('/assesmentpage', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User clicked on Assesment page",
      user: user_id
    }).save()
  }

});

//saving Setting clickstream in DB
router.post('/settingspage', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User clicked on Settings",
      user: user_id
    }).save()
  }

});

//saving SearchBar clickstream in DB
router.post('/searchbar', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User clicked on Search bar",
      user: user_id
    }).save()
  }

});

//saving Search clickstream in DB
router.post('/searchbtn', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User clicked Search Button",
      user: user_id
    }).save()
  }

});


//answers selected in assesment
router.post('/ans1a', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User Selected answer 1a",
      user: user_id
    }).save()
  }

});
router.post('/ans1b', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User Selected answer 1b",
      user: user_id
    }).save()
  }

});
router.post('/ans1c', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User Selected answer 1c",
      user: user_id
    }).save()
  }

});
router.post('/ans1d', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User Selected answer 1d",
      user: user_id
    }).save()
  }

});
router.post('/ans2a', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User Selected answer 2a",
      user: user_id
    }).save()
  }

});
router.post('/ans2b', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User Selected answer 2b",
      user: user_id
    }).save()
  }

});
router.post('/ans2c', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User Selected answer 2c",
      user: user_id
    }).save()
  }

});
router.post('/ans2d', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User Selected answer 2d",
      user: user_id
    }).save()
  }

});

//saving assesment answer clickstream in DB
router.post('/submit-quiz', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User Submitted answers",
      user: user_id
    }).save()
  }
  res.redirect("/dashboard")


});

//saving assesment answer clickstream in DB
router.post('/response', async (req, res) => {
  let user_id = req.user ? req.user._id : false
  if (user_id) {
    await new Log({
      log_type: "click",
      message: "User Submitted Contact details",
      user: user_id
    }).save()
  }
  res.redirect("/dashboard")


});





// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {

  try {
    let videos = await Video.find({}).populate({
      path: 'comments',
      populate: {
        path: 'user'
      }
    }).exec()
    return res.render('dashboard', {
      user: req.user,
      videos: videos || [],
    })
  } catch (error) {
    console.log(error)
  }

});

//Assesment
router.get('/assesment', (req, res) => {
  return res.render('assesment')
})

//contact
router.get('/contact', (req, res) => {
  return res.render('contact')
})

module.exports = router;
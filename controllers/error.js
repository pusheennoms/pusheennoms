var express = require('express');
var router = express.Router();

/**
 * Controller for if a user types in wrong addresses on the address bar
 **/
router.get('*', function (req, res) {
    res.render('error.hbs', {
        errorMsg: 'The page you have requested does not exist :('
    });
});

module.exports = router;

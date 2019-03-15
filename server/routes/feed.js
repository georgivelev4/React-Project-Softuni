const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/courses', feedController.getCourses);
router.post('/course/create',isAuth, feedController.createCourse);
router.post('/takecourse', feedController.takeCourse);
router.post('/mycourses', feedController.myCourses);
router.post('/deletecourse', isAuth, feedController.deleteCourse);
router.post('/editcourse', isAuth, feedController.editCourse);

module.exports = router;
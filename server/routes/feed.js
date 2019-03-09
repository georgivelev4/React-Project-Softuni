const router = require('express').Router();
const feedController = require('../controllers/feed');

router.get('/courses', feedController.getCourses);
router.post('/course/create', feedController.createCourse);
router.post('/takecourse', feedController.takeCourse);
router.post('/mycourses', feedController.myCourses);
router.post('/deletecourse', feedController.deleteCourse);
router.post('/editcourse', feedController.editCourse);

module.exports = router;
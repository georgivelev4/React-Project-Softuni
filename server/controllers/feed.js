const Course = require('../models/Course');
const User = require('../models/User');

module.exports = {
    getCourses: (req, res) => {
        Course.find({isTaken: false})
            .then((courses) => {
                res
                    .status(200)
                    .json({message: 'Fetched courses successfully.', courses});
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            });
    },
    createCourse: (req, res) => {
        const courseObj = req.body;
        if (!courseObj.title) {
            const error = new Error('Course title is required!');
            error.statusCode = 401;
            throw error;
        } else if (!courseObj.description) {
            const error = new Error('Course description is required!');
            error.statusCode = 401;
            throw error;
        } else if (!courseObj.imageUrl) {
            const error = new Error('Course imageURL is required!');
            error.statusCode = 401;
            throw error;
        } else if (!courseObj.cost) {
            const error = new Error('Course cost is required!');
            error.statusCode = 401;
            throw error;
        } else {
            Course.create(courseObj)
                .then((course) => {
                    res.status(200)
                        .json({
                            message: 'Course created successfully!',
                            course
                        })
                })
                .catch((error) => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    next(error);
                });
        }

    },

    takeCourse: (req, res) => {
        const id = req.body.id;

        Course.findById(id)
            .then((course) => {
                course.isTaken = true;
                course.save();
                User.findOne({username: req.body.username}).then((user) => {
                    user.courses.push(course._id);
                    user.save();
                }).catch(e => console.log(e))
                    .then(() => {
                        res.status(200)
                            .json({
                                message: 'Course taken successfully!',
                                course
                            })
                    });
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
            });
    },
    deleteCourse: (req, res) => {
        const id = req.body.id;

        Course.findByIdAndDelete(id)
            .then((course) => {
                res.status(200)
                    .json({
                        message: 'Course deleted successfully!',
                        course
                    })

            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
            });
    },
    editCourse: (req, res) => {
        const id = req.body.id;
        const data = req.body.data;
        const startingCourse = req.body.data.startingCourse;
        if (!data.title){
            data['title'] = startingCourse.title;
        }
        if (!data.description){
            data['description'] = startingCourse.description;
        }
        if (!data.imageUrl){
            data['imageUrl'] = startingCourse.imageUrl;
        }
        if (!data.cost){
            data['cost'] = startingCourse.cost;
        }
        Course.findById(id)
            .then((courseFound) => {
                courseFound.title = data.title;
                courseFound.description = data.description;
                courseFound.imageUrl = data.imageUrl;
                courseFound.cost = data.cost;
                courseFound.save();
                res.status(200)
                    .json({
                        message: 'Course edited successfully!',
                        courseFound
                    })

            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
            });

    },
    myCourses: async (req, res) => {
        const username = req.body.username;
        let coursesNeeded = [];
        User.findOne({username: username}).then(async (user) => {
            let coursesIds = user.courses;
            for (const coursesId of coursesIds) {
                await Course.findOne({_id: coursesId.toString()})
                    .then((course) => {
                        coursesNeeded.push(course);
                    });

            }
            res.status(200)
                .json({
                    coursesNeeded
                })

        });


    }
};
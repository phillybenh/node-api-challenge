const express = require('express');
const router = express.Router();
const projectDB = require('./data/helpers/projectModel');
const actionDB = require('./data/helpers/actionModel');

router.get('/', (req, res) => {
    projectDB.get()
        .then(proj => {
            res.status(200).json(proj);
        })
        .catch(error => {
            res.status(500).json({
                error: "The project information could not be retrieved."
            })
        })
})

router.get('/:id', validateProjID, (req, res) => {
    projectDB.get(req.params.id)
        .then(proj => {
            res.status(200).json(proj);
        })
        .catch(error => {
            res.status(500).json({
                error: "The project information could not be retrieved."
            })
        })
})

// Custom Middleware
function validateProjID(req, res, next) {
    projectDB.get(req.params.id)
        .then(proj => {
            if (proj !== null) {
                next();
            } else {
                res.status(400).json({
                    message: "Please use a valid project ID."
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The project information could not be retrieved from middleware."
            })
        })
}

module.exports = router;

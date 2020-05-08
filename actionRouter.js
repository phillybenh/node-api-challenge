const express = require('express');
const router = express.Router();
const projectDB = require('./data/helpers/projectModel');
const actionDB = require('./data/helpers/actionModel');

// CREATE r u d  - *See projectRouter.js b/c actions are based on project_id

// c READ u d
router.get('/', (req, res) => {
    actionDB.get()
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            res.status(500).json({
                error: "The action information could not be retrieved."
            })
        })
})

router.get('/:id', validateActionID, (req, res) => {
    actionDB.get(req.params.id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            res.status(500).json({
                error: "The action information could not be retrieved."
            })
        })
})

// c r UPDATE d
router.put('/:id', validateActionID, (req, res) => {
    actionDB.update(req.params.id, req.body)
        .then(update => {
            res.status(200).json(update)
        })
        .catch(error => {
            res.status(500).json({
                error: "The action information could not be updated."
            });
        });
})

// c r u DELETE
router.delete('/:id', validateActionID, (req, res) => {
    actionDB.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: "The action has been deleted."
                });
            } else {
                // This shouldn't happen using the validateActionID middleware
                res.status(500).json({
                    error: "The action could not be retrieved."
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The action could not be retrieved."
            });
        })
})

// Custom Middleware
function validateActionID(req, res, next) {
    actionDB.get(req.params.id)
        .then(proj => {
            if (proj !== null) {
                next();
            } else {
                res.status(400).json({
                    message: "Please use a valid action ID."
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The action information could not be retrieved from middleware."
            })
        })
}


module.exports = router;
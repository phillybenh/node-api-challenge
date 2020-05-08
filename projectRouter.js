const express = require('express');
const router = express.Router();
const projectDB = require('./data/helpers/projectModel');
const actionDB = require('./data/helpers/actionModel');



// CREATE r u d 
router.post('/', (req, res) => {
    projectDB.insert(req.body)
        .then(proj => {
            console.log('*Successfull Post*', proj)
            res.status(201).json(proj)
        })
        .catch(error => {
            res.status(500).json({
                error: "There was an error while saving the project to the database"
            })
        })
})

router.post('/:id/actions', validateProjID, (req, res) => {
    const project_id = req.params.id;
    const body = req.body;
    const action = {
        project_id,
        description: body.description,
        notes: body.notes,
        completed: body.completed
    }
    actionDB.insert(action)
        .then(action => {
            console.log('*Successfull Post*', action)
            res.status(201).json(action)
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                error: "There was an error while saving the action to the database"
            })
        })
})



// c READ u d
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
// Retrieve the list of actions for a project.
router.get('/:id/projactions', validateProjID, (req, res) => {
    projectDB.get(req.params.id)
        .then(proj => {
            // console.log(proj.actions)
            res.status(200).json(proj.actions);
        })
        .catch(error => {
            res.status(500).json({
                error: "The project's actions information could not be retrieved."
            })
        })
})

// c r UPDATE d
router.put('/:id', validateProjID, (req, res) => {
    projectDB.update(req.params.id, req.body)
        .then(update => {
            res.status(200).json(update)
        })
        .catch(error => {
            res.status(500).json({
                error: "The project information could not be updated."
            });
        });
})

// c r u DELETE
router.delete('/:id', validateProjID, (req, res) => {
    projectDB.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: "The project has been deleted."
                });
            } else {
                // This shouldn'thappen using the validateProjID middleware
                res.status(500).json({
                    error: "The project could not be retrieved."
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The project could not be retrieved."
            });
        })
} )

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

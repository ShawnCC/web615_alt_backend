'use strict';

const express = require('express');
const router = express.Router();
const models = require('../../../models');

/**
 * Create a software
 * POST /api/v1/software/
 */
router.post('/', (req, res) => {
    let responseData = {};

    models.software.create(req.body.software).then((data) => {
        responseData.status = 201,
        responseData.message = 'Software created successfully!';
        responseData.software = data;

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error creating Software.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

module.exports = router;

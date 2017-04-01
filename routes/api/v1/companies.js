'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const models = require('../../../models');

/**
 * Get a all the companies
 * GET /api/v1/companies/
 */
router.get('/', (req, res) => {
    let responseData = {};

    models.company.findAll({
        attributes: {
            exclude: ['api_key']
        },
        order: [
            ['id', 'ASC']
        ]
    }).then((data) => {
        responseData.status = 200;
        responseData.message = 'Companies retrieved successfully!';
        responseData.companies = data;

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error getting Companies.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Get a company by it's ID, with its software
 * GET /api/v1/companies/:companyId/
 */
router.get('/:companyId/software/', (req, res) => {
    let responseData = {};
    let company;

    async.series([
        // Find the company by its ID
        (callback) => {
            models.company.findById(req.params.companyId, {
                attributes: {
                    exclude: ['api_key']
                },
                include: [{
                    model: models.software
                }]
            }).then((data) => {
                if (!data) {
                    responseData.status = 404;
                    responseData.message = 'Company not found';

                    return callback(new Error(responseData.message));
                } else {
                    company = data.get({plain: true});

                    return callback();
                }
            }).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error getting Company.';

                return callback(err);
            });
        }
    ], (err) => {
        if (err) {
            console.log(new Date());
            console.log(err);

            res.status(responseData.status);
            res.json(responseData);
        } else {
            responseData.status = 200;
            responseData.message = 'Company retrieved successfully';
            responseData.company = company;

            res.status(responseData.status);
            res.json(responseData);
        }
    });
});

/**
 * Create a company
 * POST /api/v1/companies/
 */
router.post('/', (req, res) => {
    let responseData = {};

    models.company.create(req.body.company).then((data) => {
        responseData.status = 201,
        responseData.message = 'Company created successfully!';
        responseData.company = data;

        req.io.emit('POST/api/v1/companies/');

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error creating Company.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Delete a company
 * DELETE /api/v1/companies/:companyId/
 */
router.delete('/:companyId/', (req, res) => {
    let responseData = {};

    models.company.destroy({
        where: {
            id: req.params.companyId
        }
    }).then(() => {
        responseData.status = 200,
        responseData.message = 'Company deleted successfully!';

        req.io.emit('DELETE/api/v1/companies/:companyId/');

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error deleting Company.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

module.exports = router;

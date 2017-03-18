# WEB615 Alternate Backend #

Alternate backend for the React assignments

## Setup ##

The following are required as global dependencies:

* NodeJS

To install the local dependencies for the app run ``` npm i ```

## Endpoints ##

### Companies ###

* GET /api/v1/companies/ - Gets all the companies
* GET /api/v1/companies/:companyId/software/ - Gets the specified company and all of its software
* POST /api/v1/companies/ - Creates a company

### Software ###

* POST /api/v1/software/ - Creates a software
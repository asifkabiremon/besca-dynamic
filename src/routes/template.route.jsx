const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const templateCollection = require('../models/Template.model');

const router = express.Router();

// This is the route for the template page
router.get('/', async(req, res) => {
    const templateName = req.query.templateName;
    console.log(req.query);

    try {
        const filePath = await path.join(__dirname, '../../public/dynamicTemplate.json');
        // console.log(filePath);
        const data = await fs.readFile(filePath, 'utf8');
        const templates = JSON.parse(data);
        // console.log(templates);
        const template = templates.find((template) => template['templateName'] === templateName);
        if (template) {
            res.json(template);
        } else {
            res.status(404).send('Template not found');
        }
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});

// This is the route for the template page from the database
router.get('/db/', async(req, res) => {
    const templateName = req.query?.templateName || '';

    const query = { templateName: templateName };
    console.log(query);

    try {
        const getTemplate = await templateCollection.findOne( query );
        if (getTemplate) {
            return res.send(getTemplate);
        } else {
            return res.status(404).send({ message: 'Template not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});


module.exports = router;
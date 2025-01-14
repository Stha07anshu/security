const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/create', contactController.createContact);
router.get('/all_contacts', contactController.getAllContacts);


module.exports = router;

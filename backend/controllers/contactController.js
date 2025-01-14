const Contact = require('../models/contactModel');

const createContact = async (req, res) => {
  console.log("Create contact API hit");
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const newContact = new Contact({ name, email, message });

  try {
    const contact = await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact created!",
      data: contact
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      message: "All contacts fetched successfully",
      data: contacts
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

module.exports = {
  createContact,
  getAllContacts
};

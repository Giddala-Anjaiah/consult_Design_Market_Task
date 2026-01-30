const Contact = require('../models/Contact');

// Submit contact form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, city, message } = req.body;
    
    const contact = new Contact({
      name,
      email,
      phone,
      city,
      message: message || 'No message provided'
    });

    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all contact form submissions
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.remove();
    res.json({ message: 'Contact removed' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const Subscriber = require('../models/Subscriber');

// Subscribe to newsletter
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();
    
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all subscribers
exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Unsubscribe
exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.params;
    
    const subscriber = await Subscriber.findOneAndDelete({ email });
    if (!subscriber) {
      return res.status(404).json({ message: 'Email not found' });
    }
    
    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

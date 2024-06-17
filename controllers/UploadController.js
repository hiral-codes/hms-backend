const User = require('../models/User');

const uploadImage = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Store image as Buffer
        user.image = req.file.buffer;
        // Alternatively, store image URL if uploading to a storage service
        // user.imageUrl = 'URL to the image in your storage service';
        await user.save();
        res.send('Image uploaded successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = uploadImage;

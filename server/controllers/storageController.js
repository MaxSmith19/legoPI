const { decodeJWT } = require('../middleware/JWTAuthMiddleware');
const Storage = require('../models/storageModel');


const getAllSets = async (req, res) => {
    try{
        const token = decodeJWT(req, res); //Get the _id from the JWT token
        const storage = await Storage.find({userID: token.id});
        if(storage){
            res.status(200).json(storage);
        }else{
            res.status(404).json({ message: 'Storage not found' });
        }
    }catch(err){
            res.status(500).json({ message: err.message });
    
        }
    };

const getSetByID = async (req, res) => {
    try {
        const storage= await Storage.findById(req.params.id);
        if (!storage) {
            return res.status(404).json({ message: 'Storage not found' });
        }
        res.status(200).json(storage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const postNewSet = async (req, res) => {
    const token = decodeJWT(req, res); //Get the _id from the JWT token
    const storage = new Storage({
        setCode: req.body.setCode,
        userID: token.id
    }); 

    try {
        const newStorage = await storage.save();
        res.status(201).json(newStorage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const updateSet = async (req, res) => {
    try {
        const token=decodeJWT(req, res);
        const storage = await Storage.findById(token._id);
        if (!storage) {
            return res.status(404).json({ message: 'Storage not found' });
        }
        storage.additionalData = req.body.additionalData;


        const updatedStorage = await storage.save();
        res.status(200).json(updatedStorage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE a storage by ID
// @Params req(uest), res(ponse)
// Baseplate, may not be needed.
const deleteSet = async (req, res) => {
    try {
        const storage = await Storage.findById(req.params.id);
        if (!storage) {
            return res.status(404).json({ message: 'Storage not found' });
        }
        await storage.remove();
        res.status(200).json({ message: 'Storage deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports= {
    getAllSets,
    getSetByID,
    postNewSet,
    updateSet,
    deleteSet
}
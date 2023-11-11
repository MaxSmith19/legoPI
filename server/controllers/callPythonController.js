const axios = require('axios');

const checkPython = async (req, res) => {
    try {
        const response = await axios.get(process.env.PYTHON_API_CONNECTION+'/test');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getLegoSet = async (req, res) => {
    try{
        const legoCode = req.params.legoCode
        const response = await axios.get(process.env.PYTHON_API_CONNECTION+`/${legoCode}`);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { checkPython, getLegoSet };
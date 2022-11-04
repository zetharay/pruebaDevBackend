const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
    res.send('Incluya "/api/consumos" en la URL.');
});  

module.exports = router;
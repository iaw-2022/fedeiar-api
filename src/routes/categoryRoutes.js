const { Router } = require('express');
const router = Router();
const { swaggerUI, swaggerDocs } = require('../swagger.js');

const category = require('../controllers/categoryController.js');

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// ---------------------------------------------- CATEGORIES ROUTES ----------------------------------------------

router.get('/games/:game_id/categories', category.getCategories);
router.post('/games/:game_id/category', category.addCategoryToGame);
router.put('/games/:game_id/categories', category.updateCategories);


// EXPORT

module.exports = router;
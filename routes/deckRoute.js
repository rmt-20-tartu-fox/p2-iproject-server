const deckController = require('../controllers/deckController');

const router = require('express').Router();

router.post('/:cardId', deckController.addToDeck);
router.delete('/:id', deckController.removeFromDeck);
router.get('/:deckName', deckController.showDeck);

module.exports = router;
const axios = require('axios');
const { Deck } = require('../models');

class deckController {
  static addToDeck = async (req, res, next) => {
    try {
      const { cardId } = req.params;
      const { DeckName } = req.body;

      const userId = req.loginUser.id;
      const card = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=10&offset=0&id=${cardId}`);
      if (!card.data) {
        throw {
          name: 'not_found',
          code: 404,
          message: 'card not found'
        };
      }
      const CardId = card.data.data[0].id;
      const CardName = card.data.data[0].name;
      const CardType = card.data.data[0].type;
      const CardImageUrl = card.data.data[0].card_images[0].image_url;
      const deck = await Deck.create({ DeckName, UserId: userId, CardId, CardName, CardType, CardImageUrl });
      res.status(201).json(deck);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static removeFromDeck = async (req, res, next) => {
    try {
      const { id } = req.params;

      const deck = await Deck.findOne({ where: { id } });
      if (!deck) {
        throw {
          name: 'not_found',
          code: 404,
          message: 'data not found'
        };
      }
      await Deck.destroy({ where: { id } });
      res.status(200).json({ message: 'card removed from deck' });
    } catch (err) {
      next(err);
    }
  };

  static showDeck = async (req, res, next) => {
    try {
      const { deckName } = req.params;
      const userId = req.loginUser.id;
      const deck = await Deck.findAll({ where: { UserId: userId, DeckName: deckName } });
      res.status(200).json(deck);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = deckController;
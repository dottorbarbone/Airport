const express = require('express')
const router = express.router()
const updateCard = (req, res, next) => {
    const{descrizione} = req.body
    const cardId = req.params.id

    const cardModificata = {...CARD.find(c => c.id === cardId)}
    const indiceCard = CARD.findindex(c => c.id === cardId)
    cardModificata.descrizione = descrizione

    CARD[indiceCard] = cardModificata
    res.status(200).json({card: cardModificata})
}   
exports.updateCard = updateCard

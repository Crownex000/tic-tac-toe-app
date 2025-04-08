import Joi from "joi";

const playerInputSchema = Joi.object({
  player1: Joi.string().required().label('Player 1 name'),
  player2: Joi.string().required().label('Player 2 name'),
})

export default playerInputSchema;
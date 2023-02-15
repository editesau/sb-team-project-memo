import { generateCards, getImagesFiles } from '../helpers/gameLogic/gameLogicFunctions.js'

export const testFunc = (req, res) => {
  res.json(generateCards())
}

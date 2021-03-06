import { showDialogWithOptions } from '../utils/dialog-utils.js'

const VISION_OPTIONS = {
  // <text>: [<brightSight>, <dimSight>]
  'No change': null,
  'None (1 ft)': [0, 1],
  'Darkvision (30 ft)': [0, 30],
  'Darkvision (60 ft)': [0, 60],
  'Devil\'s Sight (bright 120 ft)': [120, 0],
}

const LIGHT_OPTIONS = {
  // <text>: [<brightLight>, <dimLight>]
  'No change': null,
  'None': [0, 0],
  'Candle': [5, 10],
  'Torch or Light cantrip': [20, 40],
  'Lantern - Hooded, dim': [0, 5],
  'Lantern - Hooded, bright': [30, 60],
}

const setVision = async (tokens, visionStr) => {
  const vision = VISION_OPTIONS[visionStr]
  if (!vision)
    return
  const [bright, dim] = vision
  for (const token of tokens) {
    await token.document.update({
      vision: true,
      dimSight: dim,
      brightSight: bright,
    })
  }
}

const setLight = async (tokens, lightStr) => {
  const light = LIGHT_OPTIONS[lightStr]
  if (!light)
    return
  const [bright, dim] = light
  for (const token of tokens) {
    await token.document.update({
      dimLight: dim,
      brightLight: bright,
    })
  }
}

/**
 * Will open two dialogs, for the user to set light and vision for the selected token.
 */

export const setupLightAndVision = (tokens) => {
  const selectedTokenNames = tokens.map(
    (it) => {return it.name}).join(', ')

  showDialogWithOptions(
    'Selected tokens: ' + selectedTokenNames,
    'Vision:',
    choice => setVision(tokens, choice),
    Object.keys(VISION_OPTIONS),
  )

  showDialogWithOptions(
    'Selected tokens: ' + selectedTokenNames,
    'Light:',
    choice => setLight(tokens, choice),
    Object.keys(LIGHT_OPTIONS),
  )
}

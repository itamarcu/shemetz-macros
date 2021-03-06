export const selectedTokens = () => {
  return canvas.tokens.controlled
}

export const controlledTokens = selectedTokens

export const selectedToken = () => {
  if (canvas.tokens.controlled.length === 0) {
    ui.notifications.error('Please select a token!')
    throw Error('Incorrect user input')
  }
  if (canvas.tokens.controlled.length >= 2) {
    ui.notifications.error(`Please only select one (1) token.  You selected ${canvas.tokens.controlled.length}!`)
    throw Error('Incorrect user input')
  }
  return canvas.tokens.controlled[0]
}

export const targetedTokens = () => {
  return Array.from(game.user.targets)
}

export const hoveredTokens = () => {
  return canvas.tokens.placeables.filter(it => it.mouseInteractionManager.state === 1)
}

/**
 * Returns selected actor, or the default character for your user if you're not a GM.
 * @returns {*}
 */
export const selectedOrDefaultActor = () => {
  if (canvas.tokens.controlled.length === 0 && !game.user.isGM && game.user.character)
    return game.user.character
  return selectedToken().actor
}

export const getTokenNamed = (tokenName) => {
  const token = canvas.tokens.placeables.find(t => t.name === tokenName)
  if (!token) ui.notifications.error(`token ${tokenName} cannot be found on the scene!`)
  return token
}

import { onSocketMessageEndTurnButton } from './gui/end-turn-button-in-chat-bar.js'
import { onSocketMessageHighlightSomething } from './gui/remote-highlight.js'

Hooks.on('ready', () => {
  game.socket.on('module.shemetz-macros', onSocketMessage)
})

export const onSocketMessage = (receivedMessage) => {
  if (receivedMessage.playerId && receivedMessage.playerId !== game.user.id) return
  if (receivedMessage.type === 'HIGHLIGHT_END_TURN_BUTTON') {
    onSocketMessageEndTurnButton(receivedMessage)
  }
  if (receivedMessage.type === 'HIGHLIGHT_ELEMENT') {
    onSocketMessageHighlightSomething(receivedMessage)
  }
}

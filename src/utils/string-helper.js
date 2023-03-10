/**
 *
 * @param {string} messageList
 * @var messageList: example 10200,10201
 */
export const convertMessageRunningMRPResult = (messageList) => {
  let messageArray = messageList.split(',')
  messageArray = messageArray.map(msg => ('' + msg).trim())
  return messageArray.filter(__onlyUnique)
}

export const __onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index
}

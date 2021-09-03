import consumer from './consumer'

const UpdatesChannel = consumer.subscriptions.create('UpdateChannel', {
  connected() {
    console.log("Connected")
  },

  disconnected() {
    console.log("Disconnected")
  },

  received(data) {
  },
})

export default UpdatesChannel
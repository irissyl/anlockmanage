const ws = new WebSocket('ws://127.0.0.1:8181')

ws.addEventListener('open', (event) => {
  console.log('WebSocket connected')
})

ws.addEventListener('message', (event) => {
  console.log(`Received message: ${event.data}`)
})

ws.addEventListener('error', (event) => {
  console.error('WebSocket Error:', event)
})

ws.addEventListener('close', (event) => {
  console.log(
    `WebSocket closed with code ${event.code} and reason "${event.reason}"`
  )
})

export default ws

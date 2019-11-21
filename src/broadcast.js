import inventory from './inventory'

export default async (event) => {
  let body = await inventory.update()

  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

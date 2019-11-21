import inventory from './inventory'

export default async (event, key, plusOrMinus) => {
  let value = await INVENTORY.get(key)
  if (value) {
    if (plusOrMinus === 'plus') {
      value = parseInt(value) - 1
    } else {
      value = parseInt(value) + 1
    }
    Reflect.set(inventory.items, key, value)
    event.waitUntil(await INVENTORY.put(key, value))
    return new Response(JSON.stringify(inventory.items, null, 2))
  }
  return new Response(null)
}

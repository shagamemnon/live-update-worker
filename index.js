import Router from './src/router.js'
import broadcast from './src/broadcast.js'
import UI from './src/ui.js'
import update from './src/update.js'

addEventListener('fetch', e => e.respondWith(app(e)))

function handler (request) {
  const init = {
    headers: { 'content-type': 'application/json' }
  }
  const body = JSON.stringify({ some: 'json' })
  return new Response(body, init)
}

const app = async (event) => {
  let request = event.request
  const router = new Router()
  router.get('/', req => UI.render(req))
  router.get('/inventory', req => broadcast(req))
  router.get('.*/update', req => {
    let params = new URLSearchParams(req.url.split('?').pop())
    let [key, direction] = [params.get('key'), params.get('direction')]

    return update(event, key, direction)
  })
  // router.post('.*/foo.*', req => handler(req))
  // router.get('/demos/router/foo', req => fetch(req)) // return the response from the origin
  // router.get('.*/bar', () => new Response('responding for /bar'))
  try {
    let response = await router.route(request)
    return response
  } catch (e) {
    let response = await fetch(request)
    response = new Response(response.body, response)
    response.headers.set('x-wrker-status', e)
    return response
  }
}

import request from 'supertest'
import app from '../config/app'

describe('Json Middleware', () => {
  it('Should parse body as json', async () => {
    app.post('/test_json', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_json')
      .send({ name: 'Felipe' })
      .expect({ name: 'Felipe' })
  })
})

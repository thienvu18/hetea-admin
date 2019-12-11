import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Skill } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, skill

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  skill = await Skill.create({})
})

test('POST /skills 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, skill: 'test', color: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.skill).toEqual('test')
  expect(body.color).toEqual('test')
})

test('POST /skills 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /skills 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /skills 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /skills 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /skills 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /skills/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${skill.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(skill.id)
})

test('GET /skills/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${skill.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /skills/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${skill.id}`)
  expect(status).toBe(401)
})

test('GET /skills/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /skills/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${skill.id}`)
    .send({ access_token: adminSession, skill: 'test', color: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(skill.id)
  expect(body.skill).toEqual('test')
  expect(body.color).toEqual('test')
})

test('PUT /skills/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${skill.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /skills/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${skill.id}`)
  expect(status).toBe(401)
})

test('PUT /skills/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, skill: 'test', color: 'test' })
  expect(status).toBe(404)
})

test('DELETE /skills/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${skill.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /skills/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${skill.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /skills/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${skill.id}`)
  expect(status).toBe(401)
})

test('DELETE /skills/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

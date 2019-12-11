import { success, notFound } from '../../services/response/'
import { Skill } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Skill.create(body)
    .then((skill) => skill.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Skill.count(query)
    .then(count => Skill.find(query, select, cursor)
      .then((skills) => ({
        count,
        rows: skills.map((skill) => skill.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Skill.findById(params.id)
    .then(notFound(res))
    .then((skill) => skill ? skill.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Skill.findById(params.id)
    .then(notFound(res))
    .then((skill) => skill ? Object.assign(skill, body).save() : null)
    .then((skill) => skill ? skill.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Skill.findById(params.id)
    .then(notFound(res))
    .then((skill) => skill ? skill.remove() : null)
    .then(success(res, 204))
    .catch(next)

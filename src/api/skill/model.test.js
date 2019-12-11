import { Skill } from '.'

let skill

beforeEach(async () => {
  skill = await Skill.create({ skill: 'test', color: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = skill.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(skill.id)
    expect(view.skill).toBe(skill.skill)
    expect(view.color).toBe(skill.color)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = skill.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(skill.id)
    expect(view.skill).toBe(skill.skill)
    expect(view.color).toBe(skill.color)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

import { describe, expect, it } from 'vitest'
import { hasErrors, validateSystemForm, validateSystemId } from './validation'
import type { SystemForm } from '../types'

const valid: SystemForm = {
  systemId: 'gemma-2-9b-it',
  systemUrl: 'https://huggingface.co/google/gemma-2-9b-it',
  deploymentUrl: 'https://arxiv.org/html/2408.00118',
  role: '1',
}

describe('validateSystemForm', () => {
  it('accepts a complete provider form', () => {
    expect(hasErrors(validateSystemForm(valid))).toBe(false)
  })

  it('accepts a deployer form', () => {
    expect(
      hasErrors(validateSystemForm({ ...valid, role: '2' })),
    ).toBe(false)
  })

  it('requires a system id', () => {
    expect(validateSystemForm({ ...valid, systemId: '   ' }).systemId).toMatch(
      /required/i,
    )
  })

  it('rejects non-HTTPS system URLs', () => {
    expect(
      validateSystemForm({ ...valid, systemUrl: 'http://example.com' })
        .systemUrl,
    ).toMatch(/HTTPS/i)
  })

  it('rejects non-HTTPS deployment URLs', () => {
    expect(
      validateSystemForm({ ...valid, deploymentUrl: 'http://example.com' })
        .deploymentUrl,
    ).toMatch(/HTTPS/i)
  })

  it('rejects identical evidence URLs', () => {
    expect(
      validateSystemForm({
        ...valid,
        deploymentUrl: valid.systemUrl,
      }).deploymentUrl,
    ).toMatch(/different/i)
  })

  it('rejects an unsupported role', () => {
    expect(
      validateSystemForm({ ...valid, role: '3' as '1' }).role,
    ).toMatch(/provider or deployer/i)
  })

  it('rejects an overlong system id', () => {
    expect(
      validateSystemForm({ ...valid, systemId: 'a'.repeat(201) }).systemId,
    ).toMatch(/200/)
  })
})

describe('validateSystemId', () => {
  it('accepts a normal id', () => {
    expect(validateSystemId('gemma-2-9b-it')).toBeNull()
  })

  it('rejects an empty id', () => {
    expect(validateSystemId('   ')).toMatch(/Enter/)
  })
})

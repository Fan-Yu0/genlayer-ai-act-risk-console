import { describe, expect, it } from 'vitest'
import { normalizeAssessment } from './normalize'

describe('normalizeAssessment', () => {
  it('maps the snake_case contract response', () => {
    const result = normalizeAssessment({
      system_id: 'gemma-2-9b-it',
      system_url: 'https://huggingface.co/google/gemma-2-9b-it',
      deployment_url: 'https://arxiv.org/html/2408.00118',
      publisher: '0xabc',
      role: 1,
      role_name: 'provider',
      state: 1,
      decision: 2,
      decision_name: 'disclosure_required',
      risk_tier: 2,
      risk_tier_name: 'limited',
      prohibited_practice: false,
      annex_iii_domain: 'none',
      transparency_required: true,
      source_consistency: 'consistent',
      obligations: ['ai_interaction_disclosure'],
      summary: 'Limited risk.',
      round: 1,
    })

    expect(result).toMatchObject({
      systemId: 'gemma-2-9b-it',
      decision: 2,
      riskTier: 2,
      riskTierName: 'limited',
      transparencyRequired: true,
      obligations: ['ai_interaction_disclosure'],
      round: 1,
    })
  })

  it('maps camelCase fields', () => {
    const result = normalizeAssessment({
      systemId: 'camel-system',
      riskTier: 3,
      riskTierName: 'high',
      prohibitedPractice: false,
      annexIiiDomain: 'employment',
      transparencyRequired: false,
      sourceConsistency: 'consistent',
      obligations: ['conformity_assessment'],
      summary: 'High risk.',
    })

    expect(result).toMatchObject({
      systemId: 'camel-system',
      riskTier: 3,
      annexIiiDomain: 'employment',
      obligations: ['conformity_assessment'],
    })
  })

  it('returns null without a system id', () => {
    expect(normalizeAssessment({ decision: 1 })).toBeNull()
  })
})

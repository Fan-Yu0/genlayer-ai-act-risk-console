import type { Assessment } from '../types'

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value instanceof Map) {
    return Object.fromEntries(value.entries()) as Record<string, unknown>
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return null
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String)
  if (value instanceof Map) return Array.from(value.values(), String)
  return []
}

function asNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function normalizeAssessment(raw: unknown): Assessment | null {
  const record = asRecord(raw)
  if (!record) return null
  const systemId = String(record.system_id ?? record.systemId ?? '')
  if (!systemId) return null

  return {
    systemId,
    systemUrl: String(record.system_url ?? record.systemUrl ?? ''),
    deploymentUrl: String(record.deployment_url ?? record.deploymentUrl ?? ''),
    publisher: String(record.publisher ?? ''),
    role: asNumber(record.role),
    roleName: String(record.role_name ?? record.roleName ?? ''),
    state: asNumber(record.state),
    decision: asNumber(record.decision),
    decisionName: String(record.decision_name ?? record.decisionName ?? ''),
    riskTier: asNumber(record.risk_tier ?? record.riskTier),
    riskTierName: String(record.risk_tier_name ?? record.riskTierName ?? ''),
    prohibitedPractice: Boolean(
      record.prohibited_practice ?? record.prohibitedPractice,
    ),
    annexIiiDomain: String(
      record.annex_iii_domain ?? record.annexIiiDomain ?? 'none',
    ),
    transparencyRequired: Boolean(
      record.transparency_required ?? record.transparencyRequired,
    ),
    sourceConsistency: String(
      record.source_consistency ?? record.sourceConsistency ?? 'insufficient',
    ),
    obligations: asStringArray(record.obligations),
    summary: String(record.summary ?? ''),
    round: asNumber(record.round),
  }
}

import type { SystemForm } from './types'

export const CONTRACT_ADDRESS =
  import.meta.env.VITE_CONTRACT_ADDRESS ||
  '0x3f8B4C5cBEA84Ebb90687F497bb1130D1815EeEf'

export const GENLAYER_RPC_URL =
  import.meta.env.VITE_GENLAYER_RPC_URL || 'https://studio.genlayer.com/api'

export const EXPLORER_URL = 'https://explorer-studio.genlayer.com'
export const CONTRACT_URL = EXPLORER_URL + '/address/' + CONTRACT_ADDRESS
export const SOURCE_URL =
  'https://github.com/Fan-Yu0/genlayer-ai-act-risk-gate'
export const AI_ACT_REFERENCE_URL =
  'https://eur-lex.europa.eu/eli/reg/2024/1689/oj'

export const SAMPLE_SYSTEM_ID = 'gemma-2-9b-it'

export const SAMPLE_FORM: SystemForm = {
  systemId: SAMPLE_SYSTEM_ID,
  systemUrl: 'https://huggingface.co/google/gemma-2-9b-it',
  deploymentUrl: 'https://arxiv.org/html/2408.00118',
  role: '1',
}

export const DECISION_META = {
  0: {
    label: 'Not assessed',
    tone: 'neutral',
    description: 'This system has no completed assessment yet.',
  },
  1: {
    label: 'Clear',
    tone: 'clear',
    description: 'Minimal-risk classification with no additional obligations.',
  },
  2: {
    label: 'Disclosure required',
    tone: 'review',
    description: 'Limited-risk or Article 50 transparency obligations apply.',
  },
  3: {
    label: 'Conditional',
    tone: 'review',
    description: 'High-risk Annex III system. Complete the listed obligations.',
  },
  4: {
    label: 'Blocked',
    tone: 'blocked',
    description: 'An Article 5 prohibited practice was identified.',
  },
  5: {
    label: 'Review required',
    tone: 'review',
    description: 'Evidence is conflicting, insufficient, or internally inconsistent.',
  },
} as const

export const TIER_META = {
  0: { label: 'Unknown', tone: 'neutral' },
  1: { label: 'Minimal risk', tone: 'clear' },
  2: { label: 'Limited risk', tone: 'review' },
  3: { label: 'High risk', tone: 'review' },
  4: { label: 'Prohibited', tone: 'blocked' },
} as const

export const ROLE_OPTIONS = [
  { value: '1', label: 'Provider' },
  { value: '2', label: 'Deployer' },
] as const

export const ANNEX_LABELS: Record<string, string> = {
  none: 'None',
  biometrics: 'Biometrics',
  critical_infrastructure: 'Critical infrastructure',
  education: 'Education',
  employment: 'Employment',
  essential_services: 'Essential services',
  law_enforcement: 'Law enforcement',
  migration: 'Migration',
  justice: 'Justice',
  democracy: 'Democratic processes',
}

export const OBLIGATION_LABELS: Record<string, string> = {
  risk_management_system: 'Risk management system',
  data_governance: 'Data governance',
  technical_documentation: 'Technical documentation',
  record_keeping: 'Record keeping',
  transparency_instructions: 'Transparency and instructions',
  human_oversight: 'Human oversight',
  accuracy_robustness_cybersecurity: 'Accuracy, robustness, cybersecurity',
  quality_management_system: 'Quality management system',
  conformity_assessment: 'Conformity assessment',
  ce_marking: 'CE marking',
  eu_database_registration: 'EU database registration',
  fundamental_rights_impact_assessment: 'Fundamental rights impact assessment',
  monitoring_and_logging: 'Monitoring and logging',
  transparency_to_affected_persons: 'Transparency to affected persons',
  serious_incident_reporting: 'Serious incident reporting',
  data_protection_impact_assessment: 'Data protection impact assessment',
  ai_interaction_disclosure: 'AI interaction disclosure',
  synthetic_content_marking: 'Synthetic content marking',
  deepfake_disclosure: 'Deepfake disclosure',
  emotion_recognition_disclosure: 'Emotion recognition disclosure',
  not_permitted: 'Not permitted',
}

export interface SystemForm {
  systemId: string
  systemUrl: string
  deploymentUrl: string
  role: '1' | '2'
}

export interface Assessment {
  systemId: string
  systemUrl: string
  deploymentUrl: string
  publisher: string
  role: number
  roleName: string
  state: number
  decision: number
  decisionName: string
  riskTier: number
  riskTierName: string
  prohibitedPractice: boolean
  annexIiiDomain: string
  transparencyRequired: boolean
  sourceConsistency: string
  obligations: string[]
  summary: string
  round: number
}

export type TransactionPhase =
  | 'idle'
  | 'preparing'
  | 'signing'
  | 'submitted'
  | 'finalized'
  | 'error'

export interface TransactionState {
  phase: TransactionPhase
  action?: 'register' | 'assess'
  hash?: string
  message?: string
}

export interface Notice {
  tone: 'success' | 'error' | 'info'
  message: string
}

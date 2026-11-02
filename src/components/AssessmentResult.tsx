import {
  AlertTriangle,
  BookOpen,
  Check,
  CircleDashed,
  ExternalLink,
  FileText,
  FileWarning,
  Scale,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react'
import {
  ANNEX_LABELS,
  CONTRACT_URL,
  DECISION_META,
  OBLIGATION_LABELS,
  TIER_META,
} from '../config'
import type { Assessment } from '../types'

function shorten(value: string, start = 8, end = 6) {
  if (!value) return 'Unknown'
  if (value.length <= start + end + 3) return value
  return value.slice(0, start) + '...' + value.slice(-end)
}

function DecisionIcon({ decision }: { decision: number }) {
  if (decision === 1) return <ShieldCheck size={28} aria-hidden="true" />
  if (decision === 2 || decision === 3)
    return <AlertTriangle size={28} aria-hidden="true" />
  if (decision === 4) return <ShieldAlert size={28} aria-hidden="true" />
  if (decision === 5) return <Scale size={28} aria-hidden="true" />
  return <CircleDashed size={28} aria-hidden="true" />
}

function obligationLabel(code: string) {
  return OBLIGATION_LABELS[code] || code.replace(/_/g, ' ')
}

export function AssessmentResult({
  result,
  reading,
}: {
  result: Assessment | null
  reading: boolean
}) {
  if (reading) {
    return (
      <section className="result-panel loading-state" aria-live="polite">
        <CircleDashed className="spin" size={24} aria-hidden="true" />
        Reading the accepted contract state.
      </section>
    )
  }

  if (!result) {
    return (
      <section className="result-panel empty-state">
        <div className="empty-icon">
          <FileWarning size={26} aria-hidden="true" />
        </div>
        <div>
          <h2>No assessment loaded</h2>
          <p>
            Read an existing system ID or run the live sample to inspect the
            deployed contract.
          </p>
        </div>
      </section>
    )
  }

  const decision =
    DECISION_META[result.decision as keyof typeof DECISION_META] ??
    DECISION_META[0]
  const tier =
    TIER_META[result.riskTier as keyof typeof TIER_META] ?? TIER_META[0]
  const consistencyTone =
    result.sourceConsistency === 'consistent'
      ? 'ok'
      : result.sourceConsistency === 'conflicting'
        ? 'warn'
        : 'warn'

  return (
    <section
      className={'result-panel decision-' + decision.tone}
      aria-labelledby="result-title"
    >
      <div className="decision-hero">
        <div className="decision-icon">
          <DecisionIcon decision={result.decision} />
        </div>
        <div className="decision-copy">
          <p className="eyebrow">On-chain assessment</p>
          <h2 id="result-title">{decision.label}</h2>
          <p>{result.summary || decision.description}</p>
        </div>
        <div className="decision-release">
          <span>{tier.label}</span>
          <strong>{result.roleName || 'Role unknown'}</strong>
          <code>{result.systemId}</code>
        </div>
      </div>

      <div className="metric-strip">
        <div>
          <span>Risk tier</span>
          <strong>{tier.label}</strong>
          <small>Annex III</small>
        </div>
        <div>
          <span>Transparency</span>
          <strong className={result.transparencyRequired ? 'metric-warn' : 'metric-ok'}>
            {result.transparencyRequired ? 'Required' : 'Not required'}
          </strong>
          <small>Article 50</small>
        </div>
        <div>
          <span>Prohibited</span>
          <strong className={result.prohibitedPractice ? 'metric-warn' : 'metric-ok'}>
            {result.prohibitedPractice ? 'Yes' : 'No'}
          </strong>
          <small>Article 5</small>
        </div>
        <div>
          <span>Source</span>
          <strong className={consistencyTone}>
            {result.sourceConsistency}
          </strong>
          <small>consistency</small>
        </div>
        <div>
          <span>Round</span>
          <strong>{result.round}</strong>
          <small>latest assessment</small>
        </div>
      </div>

      <div className="result-grid">
        <div className="result-section">
          <div className="section-title-row">
            <h3>Required obligations</h3>
            <span>{result.obligations.length} items</span>
          </div>
          {result.obligations.length > 0 ? (
            <div className="obligation-list">
              {result.obligations.map((item) => (
                <span className="obligation-chip" key={item}>
                  <Check size={13} aria-hidden="true" />
                  {obligationLabel(item)}
                </span>
              ))}
            </div>
          ) : (
            <p className="muted-copy">
              No additional obligations for this classification.
            </p>
          )}
          <p className="result-note">
            This is a public screening signal, not legal advice or a conformity
            assessment.
          </p>
        </div>

        <div className="result-section">
          <div className="section-title-row">
            <h3>Evidence checks</h3>
            <span>Policy inputs</span>
          </div>
          <dl className="evidence-list">
            <div>
              <dt>Annex III domain</dt>
              <dd>{ANNEX_LABELS[result.annexIiiDomain] || result.annexIiiDomain}</dd>
            </div>
            <div>
              <dt>Publisher role</dt>
              <dd>{result.roleName || 'Unknown'}</dd>
            </div>
            <div>
              <dt>Source consistency</dt>
              <dd className={consistencyTone}>{result.sourceConsistency}</dd>
            </div>
            <div>
              <dt>Publisher</dt>
              <dd title={result.publisher}>{shorten(result.publisher)}</dd>
            </div>
          </dl>
          <div className="result-links">
            <a href={result.systemUrl} target="_blank" rel="noreferrer">
              <BookOpen size={14} aria-hidden="true" />
              System docs
              <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a href={result.deploymentUrl} target="_blank" rel="noreferrer">
              <FileText size={14} aria-hidden="true" />
              Deployment docs
              <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a href={CONTRACT_URL} target="_blank" rel="noreferrer">
              Contract
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

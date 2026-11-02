import { RefreshCw, Scale, Search, Sparkles } from 'lucide-react'
import type { Assessment } from '../types'
import { Field } from './Field'

interface AssessPanelProps {
  systemId: string
  error?: string
  busy: boolean
  reading: boolean
  connected: boolean
  result: Assessment | null
  onChange: (value: string) => void
  onRead: () => void
  onAssess: () => void
  onSample: () => void
}

export function AssessPanel({
  systemId,
  error,
  busy,
  reading,
  connected,
  result,
  onChange,
  onRead,
  onAssess,
  onSample,
}: AssessPanelProps) {
  return (
    <section className="tool-panel screen-panel" aria-labelledby="assess-title">
      <div className="panel-heading">
        <div className="panel-icon secondary">
          <Scale size={19} aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow">Public verification</p>
          <h2 id="assess-title">Assess or inspect</h2>
        </div>
        <button className="text-button" type="button" onClick={onSample}>
          <Sparkles size={14} aria-hidden="true" />
          Live sample
        </button>
      </div>

      <Field
        label="System ID"
        htmlFor="assess-system-id"
        hint="Case-insensitive"
        error={error}
      >
        <input
          id="assess-system-id"
          value={systemId}
          onChange={(event) => onChange(event.target.value)}
          placeholder="gemma-2-9b-it"
          onKeyDown={(event) => {
            if (event.key === 'Enter') onRead()
          }}
        />
      </Field>

      <div className="screen-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={onRead}
          disabled={reading}
        >
          {reading ? (
            <RefreshCw className="spin" size={16} aria-hidden="true" />
          ) : (
            <Search size={16} aria-hidden="true" />
          )}
          {reading ? 'Reading' : 'Read record'}
        </button>
        <button
          className="primary-button"
          type="button"
          onClick={onAssess}
          disabled={busy || !connected}
        >
          <Scale size={16} aria-hidden="true" />
          {connected ? 'Run assessment' : 'Wallet required'}
        </button>
      </div>

      <div className="read-only-note">
        <Search size={15} aria-hidden="true" />
        Reads are public. Assessment requires a wallet because it submits a
        consensus transaction.
      </div>

      <div className="sample-note">
        <span className={result ? 'sample-live' : 'sample-dot'} />
        {result
          ? 'Loaded ' + result.systemId + ' from the deployed contract'
          : 'No on-chain record loaded yet'}
      </div>
    </section>
  )
}

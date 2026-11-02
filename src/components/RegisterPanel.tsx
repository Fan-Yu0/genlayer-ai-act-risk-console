import { FilePlus2, RotateCcw, ShieldPlus } from 'lucide-react'
import type { FormErrors } from '../lib/validation'
import { ROLE_OPTIONS } from '../config'
import type { SystemForm } from '../types'
import { Field } from './Field'

interface RegisterPanelProps {
  form: SystemForm
  errors: FormErrors
  busy: boolean
  connected: boolean
  onChange: (field: keyof SystemForm, value: string) => void
  onReset: () => void
  onSubmit: () => void
}

export function RegisterPanel({
  form,
  errors,
  busy,
  connected,
  onChange,
  onReset,
  onSubmit,
}: RegisterPanelProps) {
  return (
    <section className="tool-panel register-panel" aria-labelledby="register-title">
      <div className="panel-heading">
        <div className="panel-icon">
          <FilePlus2 size={19} aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow">Publisher action</p>
          <h2 id="register-title">Register an AI system</h2>
        </div>
        <button className="text-button" type="button" onClick={onReset}>
          <RotateCcw size={14} aria-hidden="true" />
          Sample
        </button>
      </div>

      <div className="form-stack">
        <Field
          label="System ID"
          htmlFor="system-id"
          hint="Unique key"
          error={errors.systemId}
        >
          <input
            id="system-id"
            value={form.systemId}
            onChange={(event) => onChange('systemId', event.target.value)}
            placeholder="gemma-2-9b-it"
            autoComplete="off"
          />
        </Field>

        <Field
          label="Official system documentation"
          htmlFor="system-url"
          hint="HTTPS only"
          error={errors.systemUrl}
        >
          <input
            id="system-url"
            value={form.systemUrl}
            onChange={(event) => onChange('systemUrl', event.target.value)}
            placeholder="https://huggingface.co/google/gemma-2-9b-it"
            inputMode="url"
          />
        </Field>

        <Field
          label="Deployment or intended-purpose documentation"
          htmlFor="deployment-url"
          hint="HTTPS only"
          error={errors.deploymentUrl}
        >
          <input
            id="deployment-url"
            value={form.deploymentUrl}
            onChange={(event) => onChange('deploymentUrl', event.target.value)}
            placeholder="https://arxiv.org/html/2408.00118"
            inputMode="url"
          />
        </Field>

        <Field
          label="Publisher role"
          htmlFor="role"
          hint="Provider or deployer"
          error={errors.role}
        >
          <select
            id="role"
            className="role-select"
            value={form.role}
            onChange={(event) => onChange('role', event.target.value)}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <button
        className="primary-button full-width"
        type="button"
        onClick={onSubmit}
        disabled={busy || !connected}
      >
        <ShieldPlus size={17} aria-hidden="true" />
        {connected ? 'Register on GenLayer' : 'Connect wallet to register'}
      </button>
    </section>
  )
}

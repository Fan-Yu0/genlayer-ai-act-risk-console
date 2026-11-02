import {
  BookOpen,
  CheckCircle2,
  Clipboard,
  ExternalLink,
  GitBranch,
  Info,
  Scale,
  ShieldCheck,
  TerminalSquare,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { RegisterPanel } from './components/RegisterPanel'
import { AssessPanel } from './components/AssessPanel'
import { AssessmentResult } from './components/AssessmentResult'
import { TransactionBanner } from './components/TransactionBanner'
import {
  AI_ACT_REFERENCE_URL,
  CONTRACT_ADDRESS,
  CONTRACT_URL,
  SAMPLE_FORM,
  SAMPLE_SYSTEM_ID,
  SOURCE_URL,
} from './config'
import { useWallet } from './hooks/useWallet'
import {
  assessSystem,
  readAssessment,
  registerSystem,
} from './lib/contract'
import {
  hasErrors,
  validateSystemForm,
  validateSystemId,
  type FormErrors,
} from './lib/validation'
import type {
  Assessment,
  Notice,
  SystemForm,
  TransactionState,
} from './types'
import './App.css'

function App() {
  const wallet = useWallet()
  const [registerForm, setRegisterForm] = useState<SystemForm>(SAMPLE_FORM)
  const [registerErrors, setRegisterErrors] = useState<FormErrors>({})
  const [assessId, setAssessId] = useState(SAMPLE_SYSTEM_ID)
  const [assessError, setAssessError] = useState<string>()
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [reading, setReading] = useState(true)
  const [transaction, setTransaction] = useState<TransactionState>({
    phase: 'idle',
  })
  const [notice, setNotice] = useState<Notice | null>(null)

  const busy =
    transaction.phase === 'preparing' ||
    transaction.phase === 'signing' ||
    transaction.phase === 'submitted'

  async function loadRecord(systemId: string, announce = true) {
    const error = validateSystemId(systemId)
    if (error) {
      setAssessError(error)
      return
    }

    setAssessError(undefined)
    setReading(true)
    if (announce) setNotice(null)
    try {
      const result = await readAssessment(systemId)
      setAssessment(result)
      if (!result && announce) {
        setNotice({ tone: 'info', message: 'No system record was found.' })
      }
    } catch (cause) {
      setNotice({
        tone: 'error',
        message:
          cause instanceof Error
            ? cause.message
            : 'Could not read the contract state.',
      })
    } finally {
      setReading(false)
    }
  }

  useEffect(() => {
    let active = true
    readAssessment(SAMPLE_SYSTEM_ID)
      .then((result) => {
        if (active) setAssessment(result)
      })
      .catch((cause) => {
        if (!active) return
        setNotice({
          tone: 'error',
          message:
            cause instanceof Error
              ? cause.message
              : 'Could not read the sample system.',
        })
      })
      .finally(() => {
        if (active) setReading(false)
      })
    return () => {
      active = false
    }
  }, [])

  function updateForm(field: keyof SystemForm, value: string) {
    setRegisterForm((current) => ({ ...current, [field]: value }))
    setRegisterErrors((current) => ({ ...current, [field]: undefined }))
  }

  function phaseHandler(action: 'register' | 'assess') {
    return (
      phase: TransactionState['phase'],
      message: string,
      hash?: string,
    ) => {
      setTransaction({ phase, action, message, hash })
    }
  }

  async function handleRegister() {
    const errors = validateSystemForm(registerForm)
    setRegisterErrors(errors)
    if (hasErrors(errors)) return
    if (!wallet.address) {
      setNotice({ tone: 'error', message: 'Connect a wallet first.' })
      return
    }

    setNotice(null)
    setTransaction({
      phase: 'preparing',
      action: 'register',
      message: 'Preparing registration.',
    })
    try {
      await registerSystem(
        wallet.address,
        registerForm,
        phaseHandler('register'),
      )
      const normalizedId = registerForm.systemId.trim().toLowerCase()
      setAssessId(normalizedId)
      setNotice({
        tone: 'success',
        message: 'System registered. Run an assessment when ready.',
      })
      await loadRecord(normalizedId, false)
    } catch (cause) {
      setTransaction({
        phase: 'error',
        action: 'register',
        message: cause instanceof Error ? cause.message : 'Registration failed.',
      })
    }
  }

  async function handleAssess() {
    const error = validateSystemId(assessId)
    setAssessError(error ?? undefined)
    if (error) return
    if (!wallet.address) {
      setNotice({ tone: 'error', message: 'Connect a wallet first.' })
      return
    }

    setNotice(null)
    setTransaction({
      phase: 'preparing',
      action: 'assess',
      message: 'Preparing assessment.',
    })
    try {
      await assessSystem(wallet.address, assessId, phaseHandler('assess'))
      setNotice({
        tone: 'success',
        message: 'Assessment finalized and recorded on GenLayer.',
      })
      await loadRecord(assessId, false)
    } catch (cause) {
      setTransaction({
        phase: 'error',
        action: 'assess',
        message: cause instanceof Error ? cause.message : 'Assessment failed.',
      })
    }
  }

  async function handleConnect() {
    setNotice(null)
    try {
      await wallet.connect()
    } catch (cause) {
      setNotice({
        tone: 'error',
        message:
          cause instanceof Error ? cause.message : 'Wallet connection failed.',
      })
    }
  }

  async function copyContract() {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      setNotice({ tone: 'success', message: 'Contract address copied.' })
    } catch {
      setNotice({ tone: 'error', message: 'Could not copy the address.' })
    }
  }

  return (
    <div className="app-shell">
      <Header
        address={wallet.address}
        connecting={wallet.connecting}
        hasProvider={wallet.hasProvider}
        onConnect={handleConnect}
        onDisconnect={wallet.disconnect}
      />

      <div className="contract-strip">
        <div className="contract-inner">
          <span className="strip-label">Deployed contract</span>
          <code>{CONTRACT_ADDRESS}</code>
          <button type="button" onClick={copyContract} title="Copy contract address">
            <Clipboard size={14} aria-hidden="true" />
          </button>
          <a href={CONTRACT_URL} target="_blank" rel="noreferrer">
            Explorer
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
      </div>

      {notice && (
        <div className={'notice notice-' + notice.tone} role="status">
          {notice.tone === 'success' ? (
            <CheckCircle2 size={17} aria-hidden="true" />
          ) : (
            <Info size={17} aria-hidden="true" />
          )}
          <span>{notice.message}</span>
          <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss">
            <X size={15} aria-hidden="true" />
          </button>
        </div>
      )}

      <main className="main-content">
        <section className="page-heading">
          <div>
            <p className="eyebrow">AI Act compliance workbench</p>
            <h1>AI Act Risk Console</h1>
            <p>
              Register an AI system, run a validator-backed assessment, and
              inspect the deterministic EU AI Act classification.
            </p>
          </div>
          <div className="heading-meta">
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              Consensus-backed
            </span>
            <span>
              <TerminalSquare size={16} aria-hidden="true" />
              Real contract writes
            </span>
          </div>
        </section>

        <TransactionBanner state={transaction} />

        <div className="workbench-grid">
          <RegisterPanel
            form={registerForm}
            errors={registerErrors}
            busy={busy}
            connected={Boolean(wallet.address)}
            onChange={updateForm}
            onReset={() => {
              setRegisterForm(SAMPLE_FORM)
              setRegisterErrors({})
            }}
            onSubmit={handleRegister}
          />
          <AssessPanel
            systemId={assessId}
            error={assessError}
            busy={busy}
            reading={reading}
            connected={Boolean(wallet.address)}
            result={assessment}
            onChange={(value) => {
              setAssessId(value)
              setAssessError(undefined)
            }}
            onRead={() => void loadRecord(assessId)}
            onAssess={handleAssess}
            onSample={() => {
              setAssessId(SAMPLE_SYSTEM_ID)
              void loadRecord(SAMPLE_SYSTEM_ID)
            }}
          />
        </div>

        <AssessmentResult result={assessment} reading={reading} />

        <section className="reference-band">
          <div className="reference-intro">
            <p className="eyebrow">How the gate decides</p>
            <h2>One record, five regulatory states.</h2>
            <p>
              The contract fetches two official documentation sources in a
              validator-backed nondeterministic block. The final classification
              and obligation list are deterministic.
            </p>
          </div>
          <div className="policy-list">
            <div>
              <span className="policy-dot clear" />
              <div>
                <strong>Clear</strong>
                <p>Minimal-risk system with no additional obligations.</p>
              </div>
            </div>
            <div>
              <span className="policy-dot review" />
              <div>
                <strong>Disclosure required</strong>
                <p>Limited-risk or Article 50 transparency duties apply.</p>
              </div>
            </div>
            <div>
              <span className="policy-dot review" />
              <div>
                <strong>Conditional</strong>
                <p>High-risk Annex III system; complete the listed obligations.</p>
              </div>
            </div>
            <div>
              <span className="policy-dot blocked" />
              <div>
                <strong>Blocked</strong>
                <p>An Article 5 prohibited practice was identified.</p>
              </div>
            </div>
            <div>
              <span className="policy-dot review" />
              <div>
                <strong>Review required</strong>
                <p>Evidence is conflicting, insufficient, or inconsistent.</p>
              </div>
            </div>
          </div>
          <div className="reference-links">
            <a href={SOURCE_URL} target="_blank" rel="noreferrer">
              <GitBranch size={16} aria-hidden="true" />
              Contract source
            </a>
            <a href={AI_ACT_REFERENCE_URL} target="_blank" rel="noreferrer">
              <Scale size={16} aria-hidden="true" />
              EU AI Act
            </a>
            <a href="https://docs.genlayer.com/" target="_blank" rel="noreferrer">
              <BookOpen size={16} aria-hidden="true" />
              GenLayer docs
            </a>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <span>AI Act Risk Console</span>
        <span>Built on GenLayer StudioNet</span>
      </footer>
    </div>
  )
}

export default App

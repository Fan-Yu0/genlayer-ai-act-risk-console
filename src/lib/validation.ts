import type { SystemForm } from '../types'

export type FormErrors = Partial<Record<keyof SystemForm, string>>

export function validateSystemForm(form: SystemForm): FormErrors {
  const errors: FormErrors = {}
  const systemId = form.systemId.trim()
  const systemUrl = form.systemUrl.trim()
  const deploymentUrl = form.deploymentUrl.trim()

  if (!systemId) errors.systemId = 'System ID is required.'
  else if (systemId.length > 200)
    errors.systemId = 'System ID must be 200 characters or fewer.'

  if (!systemUrl.startsWith('https://'))
    errors.systemUrl = 'Use an official HTTPS documentation URL.'
  else if (systemUrl.length > 500)
    errors.systemUrl = 'System URL must be 500 characters or fewer.'

  if (!deploymentUrl.startsWith('https://'))
    errors.deploymentUrl = 'Use an official HTTPS deployment URL.'
  else if (deploymentUrl.length > 500)
    errors.deploymentUrl = 'Deployment URL must be 500 characters or fewer.'

  if (systemUrl && deploymentUrl && systemUrl === deploymentUrl)
    errors.deploymentUrl = 'Use a different deployment or intended-purpose URL.'

  if (form.role !== '1' && form.role !== '2')
    errors.role = 'Choose provider or deployer.'

  return errors
}

export function validateSystemId(systemId: string): string | null {
  const normalized = systemId.trim()
  if (!normalized) return 'Enter a system ID to inspect.'
  if (normalized.length > 200) return 'System ID is too long.'
  return null
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0
}

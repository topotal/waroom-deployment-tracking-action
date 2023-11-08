import { getInput, setFailed, error, info } from '@actions/core'
import { HttpClient, HttpCodes } from '@actions/http-client'
import { BearerCredentialHandler } from '@actions/http-client/lib/auth'

interface RequestPayload {
  ref: string
  environment: string
  platform: string
  description: string
  repository_owner: string
  repository_name: string
}

interface WaroomDeployment {
  id: number
  service_id: number
  ref: string
  environment: string
  platform: string
  description: string
  repository_owner: string
  repository_name: string
  created_at: string
  updated_at: string
  service: WaroomService
}

interface WaroomService {
  id: number
  name: string
  organization_id: number
  created_at: string
  updated_at: string
}

export async function run(): Promise<void> {
  try {
    const organization = getInput('organization')
    const service = getInput('service')
    const key = getInput('key')
    const ref = getInput('ref')
    const environment = getInput('environment')
    const platform = getInput('platform')
    const description = getInput('description')
    const repository_owner = getInput('repository_owner')
    const repository_name = getInput('repository_name')

    const url = `https://api.app.waroom.com/v1/organizations/${organization}/services/${service}/deployments`

    const credentialHandler = new BearerCredentialHandler(key)
    const client = new HttpClient('waroom-deployment-tracking-action', [
      credentialHandler
    ])
    const payload: RequestPayload = {
      ref,
      environment,
      platform,
      description,
      repository_owner,
      repository_name
    }

    const res = await client.postJson<WaroomDeployment>(url, payload)

    if (res.statusCode !== HttpCodes.OK) {
      throw new Error(`Unexpected HTTP response: ${res.statusCode}`)
    } else {
      info(`Deployment tracking successful: ${JSON.stringify(res.result)}`)
    }
  } catch (err) {
    if (err instanceof Error) {
      error(`Deployment tracking failed: ${err.message}`)
      if (getInput('fail_on_error').toLowerCase() === 'true') {
        // Fail the workflow run if an error occurs
        setFailed(err.message)
      }
    }
  }
}

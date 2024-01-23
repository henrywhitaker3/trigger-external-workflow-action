import * as core from '@actions/core'

export default function useFetch() {
  function formatUrl(api: string, repo: string): string {
    return `${api}/repos/${repo}/dispatches`
  }

  function buildBody(event: string, payload: object): string {
    const body = {
      event_type: event,
      client_payload: payload
    }
    return JSON.stringify(body)
  }

  async function call(
    repo: string,
    api: string,
    token: string,
    event: string,
    payload: object
  ): Promise<void> {
    const url = formatUrl(api, repo)
    const body = buildBody(event, payload)

    core.debug(`URL used is ${url}`)
    core.debug(`Payload to send is ${JSON.stringify(payload)}`)

    try {
      const resp = await fetch(url, {
        method: 'POST',
        body,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (resp.status !== 204) {
        throw new Error(`Error, expected status 204, got ${resp.status}`)
      }
    } catch (err) {
      if (err instanceof Error) {
        core.error(err)
      }
      throw err
    }
  }

  return {
    call
  }
}

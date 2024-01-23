import * as core from '@actions/core'

export default function useFetch() {
  function formatUrl(api: string, repo: string): string {
    return `${api}/repos/${repo}/dispatches`
  }

  function buildBody(event: string, body: object): string {
    const payload = {
      event_type: event,
      client_payload: body
    }
    return JSON.stringify(payload)
  }

  async function call(
    repo: string,
    api: string,
    token: string,
    event: string,
    body: object
  ): Promise<void> {
    const url = formatUrl(api, repo)
    const payload = buildBody(event, body)

    core.debug(`URL used is ${url}`)
    core.debug(`Payload to send is ${JSON.stringify(payload)}`)

    try {
      const resp = await fetch(formatUrl(api, repo), {
        method: 'POST',
        body: buildBody(event, body),
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

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

  function call(
    repo: string,
    api: string,
    token: string,
    event: string,
    body: object
  ) {
    const url = formatUrl(api, repo)
    const payload = buildBody(event, body)

    core.debug(`URL used is ${url}`)
    core.debug(`Payload to send is ${JSON.stringify(payload)}`)

    return fetch(formatUrl(api, repo), {
      method: 'POST',
      body: buildBody(event, body),
      headers: {
        Accept: 'application/json',
        Authorization: `token ${token}`
      }
    })
  }

  return {
    call
  }
}

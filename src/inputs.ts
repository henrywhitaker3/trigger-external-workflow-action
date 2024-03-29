import * as core from '@actions/core'

export default function useInputs() {
  const token: string = core.getInput('token')
  const repo: string = core.getInput('repo')
  const github_api: string = core.getInput('github_api')
  const event: string = core.getInput('event')
  const payload: object = JSON.parse(core.getInput('payload'))

  function logInputs(): void {
    core.debug(`Using event = ${event}`)
    core.debug(`Using repo = ${repo}`)
    core.debug(`Using Github API = ${github_api}`)
    core.debug(`Using payload = ${JSON.stringify(payload)}`)
  }

  // function formatUrl(): string {

  // }

  return {
    token,
    repo,
    event,
    payload,
    github_api,
    logInputs
  }
}

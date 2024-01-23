import * as core from '@actions/core'

export default function useInputs() {
    const token: string = core.getInput('token')
    const repo: string = core.getInput('repo')
    const event: string = core.getInput('event')
    const body: object = JSON.parse(core.getInput('body'))

    function logInputs() {
        core.debug(`Using event = ${event}`)
        core.debug(`Using repo = ${repo}`)
        core.debug(`Using body = ${JSON.stringify(body)}`)
    }

    return {
        token,
        repo,
        event,
        body,
        logInputs
    }
}
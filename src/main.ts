import * as core from '@actions/core'
import useInputs from './inputs'
import useFetch from './fetch'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const { token, repo, event, payload, github_api, logInputs } = useInputs()

    logInputs()

    const { call } = useFetch()
    await call(repo, github_api, token, event, payload)
    core.info('Workflow Triggered Successfully')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

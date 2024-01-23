import * as core from '@actions/core'
import useInputs from './inputs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const {
      token,
      repo,
      event,
      body,
      logInputs
    } = useInputs()

    logInputs()
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

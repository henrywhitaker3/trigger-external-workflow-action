/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'
import { enableFetchMocks } from 'jest-fetch-mock'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

let fetchMock: jest.SpyInstance

// Mock the GitHub Actions core library
let infoMock: jest.SpyInstance
let debugMock: jest.SpyInstance
let errorMock: jest.SpyInstance
let getInputMock: jest.SpyInstance
// let setFailedMock: jest.SpyInstance
// let setOutputMock: jest.SpyInstance

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    infoMock = jest.spyOn(core, 'info').mockImplementation()
    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    // setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    // setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
    enableFetchMocks()
  })

  it('logs the inputs correctly', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'event':
          return 'some_event'
        case 'token':
          return 'token'
        case 'body':
          return JSON.stringify({ foo: 'bar' })
        case 'repo':
          return 'henrywhitaker3/trigger-external-workflow-action'
        case 'github_api':
          return 'https://api.github.com'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    expect(fetchMock).toHaveBeenCalled()

    // Verify that all of the core library functions were called correctly
    expect(debugMock).toHaveBeenNthCalledWith(1, 'Using event = some_event')
    expect(debugMock).toHaveBeenNthCalledWith(
      2,
      'Using repo = henrywhitaker3/trigger-external-workflow-action'
    )
    expect(debugMock).toHaveBeenNthCalledWith(
      3,
      'Using Github API = https://api.github.com'
    )
    expect(debugMock).toHaveBeenNthCalledWith(
      4,
      `Using body = ${JSON.stringify({ foo: 'bar' })}`
    )
    expect(infoMock).toHaveBeenNthCalledWith(
      1,
      'Workflow Triggered Successfully'
    )
    expect(errorMock).not.toHaveBeenCalled()
  })

  // it('sets a failed status', async () => {
  //   // Set the action's inputs as return values from core.getInput()
  //   getInputMock.mockImplementation((name: string): string => {
  //     switch (name) {
  //       case 'milliseconds':
  //         return 'this is not a number'
  //       default:
  //         return ''
  //     }
  //   })

  //   await main.run()
  //   expect(runMock).toHaveReturned()

  //   // Verify that all of the core library functions were called correctly
  //   expect(setFailedMock).toHaveBeenNthCalledWith(
  //     1,
  //     'milliseconds not a number'
  //   )
  //   expect(errorMock).not.toHaveBeenCalled()
  // })
})

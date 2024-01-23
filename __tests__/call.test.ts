import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import useFetch from '../src/fetch'

describe('call', () => {
  it('formats the request properly', async () => {
    const { call } = useFetch()

    await call(
      'henrywhitaker3/bongo',
      'https://api.example.com',
      'token',
      'some_event',
      { foo: 'bar' }
    )

    const url: string = fetchMock.mock.calls[0][0] as string
    const params: object = fetchMock.mock.calls[0][1] as object
    expect(url).toBe(
      'https://api.example.com/repos/henrywhitaker3/bongo/dispatches'
    )
    expect(params).toStrictEqual({
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'token token'
      },
      body: JSON.stringify({
        event_type: 'some_event',
        client_payload: {
          foo: 'bar'
        }
      })
    })
  })
})

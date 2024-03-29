import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
import useFetch from '../src/fetch'

enableFetchMocks()

describe('call', () => {
  it('formats the request properly', async () => {
    const { call } = useFetch()

    fetchMock.mockResponse(
      async () => new Promise(resolve => resolve({ status: 204 }))
    )
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
        Authorization: 'Bearer token'
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

import useFetch from '../src/fetch'
import { enableFetchMocks } from 'jest-fetch-mock'

beforeEach(() => {
  enableFetchMocks()
})

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

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/repos/henrywhitaker3/bongo/dispatches',
      {
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
      }
    )
  })
})

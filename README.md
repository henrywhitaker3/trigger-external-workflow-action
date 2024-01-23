# Trigger remote action

A Github action to trigger actions in another repo.

## Usage

### Remote workflow

Setup a new workflow in the target repository [(example)](https://github.com/henrywhitaker3/trigger-external-workflow-action/blob/main/.github/workflows/example-receiver.yml):

```yaml
name: Example Receiver

on:
  repository_dispatch:
    types: [some_event]

jobs:
  some_event:
    runs-on: ubuntu-latest

    steps:
      - name: Some event
        run: |
          echo some_event trigger received
          echo ${{ github.event.client_payload.foo }}
```

### Triggering the workflow

Then use this action to trigger that workflow from another repo:

```yaml
name: Example trigger

on:
  push:
    branches:
      - main

jobs:
  some_event:
    runs-on: ubuntu-latest

    steps:
      - uses: henrywhitaker3/trigger-external-workflow-action@v1
        with:
          token: ${{ secrets.TRIGGER_TOKEN }} # You need to setup a PAT for this, as secrets.GITHUB_TOKEN is repo-scoped and won't work
          repo: henrywhitaker3/trigger-external-workflow-action # Replace with your repo
          event: some_event # Replace with your event name
          payload: '{"foo": "bar"}'
```

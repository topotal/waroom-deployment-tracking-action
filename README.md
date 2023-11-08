# Waroom Deployment Tracking for GitHub Actions

GitHub Action that allows you to track your deployments on Waroom.

## Usage

To use this action, add the following code to your workflow file:

```yaml
- name: Waroom Deployment Tracking
  uses: topotal/waroom-deployment-tracking-action@v1
  with:
    organization: 'your-waroom-organization'
    service: 'your-waroom-service'
    key: ${{ secrets.WAROOM_DEPLOYMENT_INTEGRATION_KEY }}
    environment: 'production'
```

If you want to specify `description` as git commit message,
you can use the following code:

```yaml
- name: Waroom Deployment Tracking
  uses: topotal/waroom-deployment-tracking-action@v1
  with:
    organization: 'your-waroom-organization'
    service: 'your-waroom-service'
    key: ${{ secrets.WAROOM_DEPLOYMENT_INTEGRATION_KEY }}
    environment: 'production'
    description: ${{ github.event.head_commit.message }}
```

_Note_: `github.event.head_commit.message` is available only when the event is `push`.

## Inputs

- `organization`: The Waroom organization name (required).
- `service`: The Waroom service name (required).
- `key`: The Waroom Deployment Integration Key (required)
  - Recommended to retrieve it from GitHub Secrets.
- `ref`: Ref for the deployment
  - default: `${{ github.sha }}`.
- `environment`: The environment where the deployment is taking place.
- `platform`: Platform of the repository
  - default: `github`
- `description`: Description for the deployments.
- `repository_owner`: Owner of the repository
  - default: `${{ github.repository_owner }}`
- `repository_name`: Name of the repository
  - default: `${{ github.event.repository.name }}`.
- `fail_on_error`: Fail the action if an error occurs
  - default: `false`

# Sync Repo Action

This action syncs a repository folder to a remote server using SSH and `rsync`.

## Inputs

- `ssh-private-key` (required): The private SSH key for authentication.
- `remote-user` (required): The remote server username.
- `remote-host` (required): The remote server hostname.
- `local-path` (required): The local folder path to sync.
- `remote-path` (required): The remote folder path to sync to.

## Outputs

- `success-message`: Confirmation message after successful sync.

## Example Usage

```yaml
- name: Sync with Remote Server
  uses: your-username/sync-repo-action@v1
  with:
    ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
    remote-user: "user"
    remote-host: "host.com"
    local-path: "dist/"
    remote-path: "/var/www/html/"
```

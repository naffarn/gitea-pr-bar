# gitea-pr-bar

A pull request bar for Gitea in Claude Code. The desktop app shows a PR bar for GitHub repositories only; this mod draws one above the prompt for repositories hosted on Gitea.

## What it shows

On a branch with an open pull request:

- a state icon (open, draft, merged, closed), the PR number as a link, the repository and the branch
- a count of review comments, and the state of checks and reviews
- buttons for what there is to do: **Merge**, **Fix CI**, **Address comments**, **Resolve conflicts**
- a `⋯` row with the PR's details, **Auto-fix**, **Auto-merge** and **Refresh**

On a branch with no pull request it offers **Create PR**. It stays hidden on the default branch, on GitHub repositories, and on any host other than your Gitea server.

It finds the open pull request whose head is the branch you have checked out, and looks again every 60 seconds and after each turn.

## What you need

- A recent Claude Code. The mod API is early access and can change between releases.
- Go, for the `go run` setup command below.
- The Gitea MCP server, registered under the name `gitea`. The bar reads and merges through that connection, so it holds no token of its own, and everything it does happens as your Gitea account:

  ```bash
  read -rs GITEA_TOKEN && claude mcp add -s user gitea -e GITEA_HOST=https://gitea.example.com -e "GITEA_ACCESS_TOKEN=$GITEA_TOKEN" -- go run gitea.com/gitea/gitea-mcp@latest -t stdio && unset GITEA_TOKEN
  ```

  Replace `https://gitea.example.com` with your Gitea instance URL. The token needs `read:user`, `write:repository` and `write:issue` scopes.

## Install

At the prompt of a terminal session:

```
/plugin install gitea-pr-bar --marketplace naffarn/gitea-pr-bar
```

From a shell:

```bash
claude plugin install gitea-pr-bar --marketplace naffarn/gitea-pr-bar
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `naffarn/gitea-pr-bar`, then Add plugin.

## Using it

- **Merge** asks first, then merges with the repository's default merge style, and deletes the branch if the repository's default says so.
- **Fix CI**, **Address comments**, **Resolve conflicts** and **Create PR** each send Claude one prompt. Pressed while a turn is running, the prompt waits for that turn to end.
- **Auto-fix** sends those prompts by itself when a check starts failing, a conflict appears, or someone else leaves review feedback.
- Review comments and CI output are untrusted input. Auto-fix tells Claude not to follow instructions embedded in them, but it can still commit and push without another confirmation. Enable it only when you trust the repository's reviewers and CI, and review its commits before merging.
- **Auto-merge** merges once the PR is approved, or once its checks pass with no review outstanding. It runs in the session, so it only works while the session is open.
- `×` hides the bar. `/gitea-pr` brings it back.
- `/gitea-pr <number or URL>` binds a pull request by hand. A PR from another branch is shown as status only: it gets no buttons.

## Limits

- The row's sizing is measured from the desktop app's own drawing. On another setup a long branch name may be cut a little early or late.
- Review comments are counted whole; the Gitea MCP server does not say which are resolved.
- One pull request at a time.

## Development

```bash
claude plugin validate .
claude plugin test .
```

## Thanks

The layout follows [ado-pr-claude-plugin](https://github.com/Pro-Sharp/ado-pr-claude-plugin), which does the same for Azure DevOps.

## Licence

MIT. See [LICENSE](LICENSE).

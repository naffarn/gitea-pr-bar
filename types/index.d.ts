export type Checks = {
  state: 'none' | 'pending' | 'success' | 'failure'
  passed: number
  pending: number
  failing: string[]
}

export type Review = 'none' | 'requested' | 'approved' | 'changes'

export type Pr = {
  owner: string
  repo: string
  number: number
  title: string
  url: string
  state: 'open' | 'draft' | 'merged' | 'closed'
  head: string
  /** Whether its head is the branch checked out here. */
  isCurrent: boolean
  base: string
  sha: string
  isMergeable: boolean
  /** When Gitea first reported it unmergeable, epoch ms; null while it is not. */
  unmergeableSince: number | null
  hasConflicts: boolean
  checks: Checks
  review: Review
  /** The newest review by someone else that requests changes or comments. */
  feedbackId: number
  /** Inline comments in other people's reviews. */
  comments: number
  mergeStyle: string
  deletesBranch: boolean
}

/** A branch on the Gitea server with no pull request: what Create PR names. */
export type Branch = {
  owner: string
  repo: string
  name: string
}

export type Bar = {
  pr: Pr | null
  /** The current branch, while it has no PR and is not the default branch. */
  branch: Branch | null
  isAutoFix: boolean
  isAutoMerge: boolean
  isConfirmingMerge: boolean
  isMenuOpen: boolean
  /** What the person closed the bar on: `#7`, or a branch's name. */
  dismissed: string | null
  /** A PR number bound with /gitea-pr, tracked whatever the branch. */
  pinned: number | null
}

declare module 'claude-code' {
  interface PluginState {
    'gitea-pr-bar': { bar: Shaped<Bar> }
  }
}

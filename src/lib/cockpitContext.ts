export interface CockpitContext {
  project: {
    name: string;
    repoName: string;
    repoPath: string;
  };
  git: {
    branch: string;
    remote: string;
    latestKnownCommit: string;
    latestKnownCommitMessage: string;
    workingTree: string;
    mode: string;
  };
  system: {
    uiStatus: string;
    commandRouterStatus: string;
    backendStatus: string;
    aiProviderStatus: string;
    terminalStatus: string;
    safetyGate: string;
  };
  meta: {
    lastVerifiedAt: string;
    snapshotType: string;
  };
}

export const cockpitContext: CockpitContext = {
  project: {
    name: "KAH Prime Cockpit Prototype",
    repoName: "kah-prime-cockpit-prototype",
    repoPath: "~/kah-prime-cockpit-prototype",
  },
  git: {
    branch: "main",
    remote: "origin/main",
    latestKnownCommit: "e7ecffd",
    latestKnownCommitMessage: "fix: polish mock command card responses",
    workingTree: "Clean",
    mode: "Read-only mock",
  },
  system: {
    uiStatus: "OK",
    commandRouterStatus: "OK",
    backendStatus: "Not connected",
    aiProviderStatus: "Not connected",
    terminalStatus: "Disabled",
    safetyGate: "Active",
  },
  meta: {
    lastVerifiedAt: "Manual verification",
    snapshotType: "Read-only mock snapshot",
  },
};

export const getContext = (): CockpitContext => {
  return cockpitContext;
};
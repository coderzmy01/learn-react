#!/bin/bash
set -Eeuo pipefail

log() {
  printf '\n[claude-fix] %s\n' "$1"
}

need_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf 'Required command "%s" not found in PATH.\n' "$1" >&2
    exit 1
  fi
}

show_paths() {
  log "claude binaries resolved via PATH:"
  if ! command -v -a claude >/dev/null 2>&1; then
    printf 'claude command not found. Install Claude Code first (claude install).\n' >&2
    exit 1
  fi
  command -v -a claude
}

resolve_version() {
  if output=$(claude --version 2>&1); then
    printf 'Active claude version: %s\n' "$output"
  else
    printf 'Unable to read current claude version.\n'
  fi
}

reinstall_global() {
  if ! command -v npm >/dev/null 2>&1; then
    log "Skipping npm global reinstall: npm not available."
    return
  fi
  local root
  root=$(npm root -g 2>/dev/null || true)
  if [[ -z "$root" || ! -d "$root/@anthropic-ai/claude-code" ]]; then
    log "No npm global claude installation detected."
    return
  fi
  log "Refreshing npm global claude-code package..."
  npm install -g @anthropic-ai/claude-code@latest
}

reinstall_local_dir() {
  local local_dir="$HOME/.claude/local"
  if [[ ! -d "$local_dir" || ! -f "$local_dir/package.json" ]]; then
    log "No ~/.claude/local installation detected."
    return
  fi
  if ! command -v npm >/dev/null 2>&1; then
    log "Skipping local reinstall: npm not available."
    return
  fi
  log "Refreshing claude-code inside ~/.claude/local..."
  (cd "$local_dir" && npm install @anthropic-ai/claude-code@latest)
}

main() {
  log "Starting claude CLI repair"
  need_cmd claude
  show_paths
  resolve_version
  reinstall_global
  reinstall_local_dir
  hash -r 2>/dev/null || true
  resolve_version
  log "If version is still stale, rerun claude install or remove unused binaries listed above."
  log "Final claude --version output:"
  claude --version || true
}

main "$@"

#!/usr/bin/env bash
# 用法: bp-yaml-snapshot.sh [file] —— TDD 相变前的状态快照
set -eu
f="${1:-specs/state.yaml}"
[ -f "$f" ] || { echo "no $f"; exit 1; }
mkdir -p specs/.snapshots
cp "$f" "specs/.snapshots/$(basename "$f").$(date +%Y%m%dT%H%M%S)"
echo "snapshot-ok: $f"

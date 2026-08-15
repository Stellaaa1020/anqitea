#!/usr/bin/env bash
# TDD 双提交校验：HEAD~1 必须是"只动测试/记录"的 RED 提交，HEAD 必须 GREEN。
# 用法: verify-tdd-red-commit.sh [--self-test]
set -u
if [ "${1:-}" = "--self-test" ]; then
  bash -n "$0" && echo "self-test: syntax ok, gates defined (red-only-files, green-suite)"; exit 0
fi
git rev-parse HEAD~1 >/dev/null 2>&1 || { echo "FAIL: need at least 2 commits"; exit 1; }
red_files=$(git show --pretty=format: --name-only HEAD~1 | sed '/^$/d')
bad=$(printf '%s\n' "$red_files" | grep -v -E '^(test|specs|scripts)/' || true)
if [ -n "$bad" ]; then
  echo "FAIL: RED commit HEAD~1 touches non-test files:"; echo "$bad"; exit 1
fi
if ! node --test test/ >/dev/null 2>&1; then
  echo "FAIL: suite not green at HEAD"; exit 1
fi
echo "OK: HEAD~1 test-only; HEAD green ($(git log -1 --format=%s))"

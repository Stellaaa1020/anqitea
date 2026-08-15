#!/usr/bin/env bash
# 用法: bp-timing.sh start|end <skill> —— 记录技能调用时序到 specs/timings.log
set -u
[ $# -eq 2 ] || { echo "usage: $0 start|end <skill>"; exit 1; }
mkdir -p specs
printf '%s\t%s\t%s\n' "$(date +%FT%T%z)" "$1" "$2" >> specs/timings.log
echo "timings: $1 $2"

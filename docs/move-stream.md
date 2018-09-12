# `MoveStream`

A [move stream](../src/move-stream.ts) represents a sequence of moves that may potentially be coming from a real-time source.

## Design goals

- Support taking "real-time" move input (keyboard, [Bluetooth](https://github.com/cubing/cuble.js), etc.) and displaying it with minimal latency.
  - Moves may be provided at the beginning (keyboard), in the middle (GiiKER), or gradually (GoCube).
- Support playback with zero latency compared to real-time events.
- Support multiple simultaneous moves without requiring the beginnings/ends of those moves to align.
- Allow heuristics to group moves:
  - L L = L2
  - L R' = M' // and reorient perspective

## Playing back recorded moves

Let the defautl move duration be e.g. 400ms

Beginning of each move provided: animate up to default move duration, or the start of the next move (that can't be done simultaneously), whichever is shorter.

Center of each move provided: animate for a duration centered on the event, extending symmetrically so that it reaches halfway to the closest adjacent move.

## The "catch-up problem"

Suppose we only get one event per move (e.g. keyboard, GiiKER). We have to decide for how long to animate the move by default – e.g. 400ms. But if another event comes in 100ms after, we need to figure out what to do. Some simple options:

- Immediately skip to the end of the first move, and start animating the second.
- Queue moves, e.g. spend 400ms on the first move, then 400ms on the second move, etc. This can get arbitrarily far behind.
- Display moves at a 400ms latency.
- Animate all moves so fast that real-world input will not overtake the animation, e.g. 75ms per turn.

Each of these are unpalatable for some use cases, even if you tweak the value of 400ms. I would really like something like the following:

- If turns are taking place slowly, animate them for 400ms each.
- If turns are coming in at 10tps, animate them for ≤100ms each.

In both situations, we can handle a steady stream in "real time", since the previous move is just about done when any given move comes in. But we need a "catch-up" strategy if were still animating a 250ms move when new moves come in 100ms later.


## Example 1

GiiKER cube, events are halfway through move.

| Time   | Move |
|--------|------|
| 400ms  | R    |
| 800ms  | U    |
| 1000ms | R'   |

If we have this data ahead of time, we would want to animate:

| Time   | Move | Start | End    |
|--------|------|-------|--------|
| 400ms  | R    | 200ms | 600ms  |
| 800ms  | U    | 700ms | 900ms  |
| 1000ms | R'   | 900ms | 1100ms |

However, when U comes in, we have:

| Time   | Move | Real-time Start | Real-time End |
|--------|------|-------|--------|
| 400ms  | R    | 400ms | 800ms  |
| 800ms  | U    | 800ms | 1200ms |

When the R' comes in, we are halfway through animating U.

"use client";

import { useSyncExternalStore } from "react";

// Tiny global flag: has the intro loader finished?
let done = false;
const listeners = new Set<() => void>();

export function markLoaded() {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
}

export function isLoaded() {
  return done;
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useLoaded() {
  return useSyncExternalStore(
    subscribe,
    () => done,
    () => false,
  );
}

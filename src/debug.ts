
// TODO: Support disabling.
export function debugLog(...args: any[]) {
  if (console.info) {
    console.info.apply(console, args);
  } else {
    console.log.apply(console, args);
  }
}

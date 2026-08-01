export function resolveHomeFaqCategoryKey(
  requestedKey: string,
  availableKeys: readonly string[],
): string {
  if (availableKeys.includes(requestedKey)) {
    return requestedKey;
  }

  return availableKeys[0] ?? "";
}

export function getNextHomeFaqItemOpenState(isOpen: boolean): boolean {
  return !isOpen;
}

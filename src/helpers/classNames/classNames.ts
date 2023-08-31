type Mods = Record<string, boolean | string>;

export function classNames(
  cls: string,
  mods: { [key: string]: boolean },
  additional: string[]
): string {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      .filter(([_, value]) => value)
      .map(([className]) => className),
  ].join(' ');
}

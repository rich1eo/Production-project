// <Page Address, Scroll Position>
export type ScrollSchema = Record<string, number>;

export interface UISchema {
  scroll: ScrollSchema;
}

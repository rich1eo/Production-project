export enum ArticleType {
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS',
}

export enum ArticleBlockType {
  CODE = 'CODE',
  IMG = 'IMAGE',
  TEXT = 'TEXT',
}

export interface ArticleBaseBlock {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBaseBlock {
  type: ArticleBlockType.CODE;
  code: string;
}

export interface ArticleImgBlock extends ArticleBaseBlock {
  type: ArticleBlockType.IMG;
  src: string;
  title: string;
}

export interface ArticleTextBlock extends ArticleBaseBlock {
  type: ArticleBlockType.TEXT;
  title: string;
  paragraphs: string[];
}

export type ArticleBlock =
  | ArticleCodeBlock
  | ArticleImgBlock
  | ArticleTextBlock;

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
}

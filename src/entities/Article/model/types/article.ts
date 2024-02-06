import { User } from 'entities/User';
import { ArticleBlockType, ArticleType } from '../consts/consts';

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
  user: User;
  type: ArticleType[];
  blocks: ArticleBlock[];
}

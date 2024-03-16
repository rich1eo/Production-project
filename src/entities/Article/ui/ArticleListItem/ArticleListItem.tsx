import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';

import { classNames } from '@/shared/lib';
import {
  Avatar,
  AppLink,
  Card,
  Button,
  ButtonTheme,
  Text,
  AppImage,
  Skeleton,
} from '@/shared/ui';
import { getRouteArticleDetails } from '@/shared/const/router';
import EyeIcon from '@/shared/assets/icons/eye.svg';

import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleBlockType, ArticleListView } from '../../model/consts/consts';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import styles from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  article: Article;
  view: ArticleListView;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;

  const { t } = useTranslation();

  const types = (
    <Text text={article.type.join(', ')} className={styles.types} />
  );

  const views = (
    <>
      <Text text={article.views.toString()} className={styles.views} />
      <EyeIcon className={styles.icon} />
    </>
  );

  if (view === ArticleListView.BIG) {
    const textBlock = article.blocks.find(
      (article) => article.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
      <div
        className={classNames(styles.ArticleListItem, {}, [
          className,
          styles[view],
        ])}
        data-testid="ArticleListItem"
      >
        <Card className={styles.card}>
          <div className={styles.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={styles.username} />
            <Text text={article.createdAt} className={styles.date} />
          </div>
          <Text title={article.title} className={styles.title} />
          {types}
          <AppImage
            src={article.img}
            className={styles.img}
            alt={article.title}
            fallback={<Skeleton width="100%" height={250} />}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={styles.textBlock}
            />
          )}
          <div className={styles.footer}>
            <AppLink to={getRouteArticleDetails(article.id)} target={target}>
              <Button theme={ButtonTheme.OUTLINE}>
                {t('Читать далее...')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      className={classNames(styles.ArticleListItem, {}, [
        className,
        styles[view],
      ])}
      to={getRouteArticleDetails(article.id)}
      target={target}
      data-testid="ArticleListItem"
    >
      <Card className={styles.card}>
        <div className={styles.imgWrapper}>
          <AppImage
            src={article.img}
            alt={article.title}
            className={styles.img}
            fallback={<Skeleton width="100%" height={200} border="6" />}
          />
          <Text text={article.createdAt} className={styles.date} />
        </div>
        <div className={styles.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={styles.title} />
      </Card>
    </AppLink>
  );
});

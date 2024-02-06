import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ArticleListItem.module.scss';

import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import Text from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import Avatar from 'shared/ui/Avatar/Avatar';

import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleBlockType, ArticleListView } from '../../model/consts/consts';

import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppLink } from 'shared/ui/AppLink/AppLink';

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
      >
        <Card className={styles.card}>
          <div className={styles.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={styles.username} />
            <Text text={article.createdAt} className={styles.date} />
          </div>
          <Text title={article.title} className={styles.title} />
          {types}
          <img src={article.img} className={styles.img} alt={article.title} />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={styles.textBlock}
            />
          )}
          <div className={styles.footer}>
            <AppLink
              to={RoutePath.articles_details + article.id}
              target={target}
            >
              <Button theme={ThemeButton.OUTLINE}>
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
      to={RoutePath.articles_details + article.id}
      target={target}
    >
      <Card className={styles.card}>
        <div className={styles.imgWrapper}>
          <img src={article.img} alt={article.title} className={styles.img} />
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

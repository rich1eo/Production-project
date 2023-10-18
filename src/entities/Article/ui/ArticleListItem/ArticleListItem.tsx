import { memo, useCallback } from 'react';
import styles from './ArticleListItem.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import Text from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import {
  Article,
  ArticleBlockType,
  ArticleListView,
  ArticleTextBlock,
} from '../../model/types/article';
import { Card } from 'shared/ui/Card/Card';
import Avatar from 'shared/ui/Avatar/Avatar';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface ArticleListItemProps {
  article: Article;
  className?: string;
  view: ArticleListView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const types = (
    <Text text={article.type.join(', ')} className={styles.types} />
  );
  const views = (
    <>
      <Text text={article.views.toString()} className={styles.views} />
      <EyeIcon className={styles.icon} />
    </>
  );

  const handleOpenArticle = useCallback(() => {
    navigate(`${RoutePath.articles_details}${article.id}`);
  }, [article.id, navigate]);

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
            <Button onClick={handleOpenArticle} theme={ThemeButton.OUTLINE}>
              {t('Читать далее...')}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.ArticleListItem, {}, [
        className,
        styles[view],
      ])}
      onClick={handleOpenArticle}
      role="button"
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
    </div>
  );
});

import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={className}>
      {isEdit ? 'Редактирование статьи с id: ' + id : 'Создание новой статьи'}
    </Page>
  );
});

export default ArticleEditPage;

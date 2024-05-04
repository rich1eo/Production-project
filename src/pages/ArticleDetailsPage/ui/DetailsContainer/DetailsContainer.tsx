import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { CardRedesigned } from '@/shared/ui';

interface DetailsContainerProps {
  className?: string;
}

export const DetailsContainer = ({ className }: DetailsContainerProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <CardRedesigned className={className} cardPadding="24" max>
      <ArticleDetails id={id} />
    </CardRedesigned>
  );
};

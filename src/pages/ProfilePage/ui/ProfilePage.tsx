import { useParams } from 'react-router-dom';

import { EditableProfileCard } from '@/features/editableProfileCard';
import { VStack } from '@/shared/ui';
import { Page } from '@/widgets/Page';

interface ProfilePageProps {
  className?: string;
}

export default function ProfilePage({ className }: ProfilePageProps) {
  const { id } = useParams<{ id: string }>();

  return (
    <Page className={className} data-testid="ProfilePage">
      <VStack max gap="16">
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
}

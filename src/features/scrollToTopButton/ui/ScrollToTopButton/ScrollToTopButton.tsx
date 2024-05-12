import { Icon } from '@/shared/ui';
import ScrollIcon from '@/shared/assets/icons/circle-up.svg';

type ScrollToTopButtonProps = {
  className?: string;
};

export const ScrollToTopButton = ({ className }: ScrollToTopButtonProps) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Icon
      Svg={ScrollIcon}
      width={32}
      height={32}
      clickable
      onClick={handleClick}
      className={className}
    />
  );
};

import { memo, useState } from 'react';

import { classNames } from '@/shared/lib';
import StarIcon from '@/shared/assets/icons/star.svg';

import styles from './StarRating.module.scss';

interface StarRatingProps {
  className?: string;
  onSelect?: (starRating: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
  const { className, selectedStars = 0, size = 30, onSelect } = props;
  const [currentStarsCount, setCurrentStarsCount] = useState(
    selectedStars ?? 0
  );
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const handleHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const handleLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const handleClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div className={classNames(styles.StarRating, {}, [className])}>
      {stars.map((starNumber) => (
        <StarIcon
          key={starNumber}
          className={classNames(styles.starIcon, {
            [styles.hovered]: currentStarsCount >= starNumber,
            [styles.selected]: isSelected,
          })}
          width={size}
          height={size}
          onMouseEnter={handleHover(starNumber)}
          onMouseLeave={handleLeave}
          onClick={handleClick(starNumber)}
          data-testid={`StarRating.${starNumber}`}
          data-selected={currentStarsCount >= starNumber}
        />
      ))}
    </div>
  );
});

import { memo, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import StarIcon from '@/shared/assets/icons/star.svg';

import styles from './StarRating.module.scss';

interface StarRatingProps {
  className?: string;
  onSelect?: (startRating: number) => void;
  size?: number;
  selectedStars?: number;
}

const start = [1, 2, 3, 4, 5];

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
      {start.map((starsNumber) => (
        <StarIcon
          key={starsNumber}
          className={classNames(styles.starIcon, {
            [styles.hovered]: currentStarsCount >= starsNumber,
            [styles.selected]: isSelected,
          })}
          width={size}
          height={size}
          onMouseEnter={handleHover(starsNumber)}
          onMouseLeave={handleLeave}
          onClick={handleClick(starsNumber)}
        />
      ))}
    </div>
  );
});

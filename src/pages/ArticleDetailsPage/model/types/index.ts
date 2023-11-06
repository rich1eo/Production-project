import { ArticleDetailsRecommendationSchema } from './ArticleDetailsRecommendationSchema';
import { ArticleDetailsCommentSchema } from './ArticlesDetailsCommentSchema';

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentSchema;
  recommendations: ArticleDetailsRecommendationSchema;
}

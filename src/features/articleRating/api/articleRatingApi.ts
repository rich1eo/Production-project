import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

type GetArticleRatingArgs = { articleId: string; userId: string };
type RateArticleArgs = {
  userId: string;
  articleId: string;
  rate: number;
  feedback?: string;
};

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArgs>({
      query: ({ articleId, userId }) => ({
        url: '/article-ratings',
        params: {
          articleId,
          userId,
        },
      }),
    }),
    rateArticle: build.mutation<void, RateArticleArgs>({
      query: (args) => ({
        url: '/article-ratings',
        method: 'POST',
        body: args,
      }),
    }),
  }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;

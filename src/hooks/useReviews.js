import { useQuery } from '@apollo/client';
import { MY_REVIEWS } from '../graphql/queries';

const useReviews = () => {
  return useQuery(MY_REVIEWS, {
    fetchPolicy: 'cache-and-network',
  });
};

export default useReviews;

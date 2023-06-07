import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  return useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword },
  });
};

export default useRepositories;

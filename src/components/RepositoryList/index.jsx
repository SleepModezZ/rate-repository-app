import RepositoryListContainer from './RepositoryListContainer';
import Text from '../Text';
import useRepositories from '../../hooks/useRepositories';
import { useState } from 'react';

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data, loading, error } = useRepositories(orderBy, orderDirection, searchKeyword);

  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>Error</Text>;
  }

  const repositoryNodes = data.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;

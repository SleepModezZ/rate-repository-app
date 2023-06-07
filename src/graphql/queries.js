import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          fullName
          description
          ownerAvatarUrl
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          url
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query findRepositoryByID($repositoryID: ID!) {
    repository(id: $repositoryID) {
      id
      fullName
      description
      ownerAvatarUrl
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_AUTH_STATUS = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const MY_REVIEWS = gql`
  query {
    me {
      reviews {
        edges {
          node {
            createdAt
            id
            rating
            repository {
              id
              fullName
              url
            }
            text
          }
        }
      }
      id
      createdAt
      username
    }
  }
`;

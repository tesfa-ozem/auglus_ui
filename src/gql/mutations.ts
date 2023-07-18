import { gql } from '@apollo/client';
const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on LoginSuccess {
        accessToken
        refreshToken
      }
      ... on LoginError {
        message
      }
    }
  }
`;

const REFRESH = gql`
  mutation ($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;

export { LOGIN, REFRESH };

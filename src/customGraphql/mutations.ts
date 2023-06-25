export const addToFollowing = /* GraphQL */ `
  mutation AddToFollowing($username: String!, $friend: String!) {
    updateUser(input: {username: $username, following: {set: [$friend]}}) {
      username
      following
    }
  }
`;

export const updateFollowing = /* GraphQL */ `
  mutation AddToFollowing($username: String!, $array: [String!]) {
    updateUser(input: {username: $username, following: $array}) {
      username
      following
    }
  }
`;

export const updateFollowers = /* GraphQL */ `
  mutation UpdateFollowing($username: String!, $array: [String!]) {
    updateUser(
      input: {followers: $array, username: $username}
      condition: {username: $username}
    ) {
      followers
    }
  }
`;

//

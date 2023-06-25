export const listAllUsernames = /* GraphQL */ `
  query ListAllUsernames($username: String, $limit: Int) {
    listAllUsernames(username: $username, limit: $limit) {
      usernames {
        username
      }
    }
  }
`;

// Query users based a filter, output username,name and profilePicKey
export const listSomeUsers = /* GraphQL */ `
  query ListUsers($username: String, $filter: ModelUserFilterInput) {
    listUsers(username: $username, filter: $filter) {
      items {
        username
        name
        profilePicKey
      }
    }
  }
`;
// extract following Array from logged in User
export const extractFollowing = /* GraphQL */ `
  query ExtractFollowing($username: String!) {
    getUser(username: $username) {
      following
    }
  }
`;

// extract followers array from whomever you stalking ;)
export const extractFollowersFromGuest = /* GraphQL */ `
  query ExtractFollowersFromGuest($username: String!) {
    getUser(username: $username) {
      followers
    }
  }
`;

//

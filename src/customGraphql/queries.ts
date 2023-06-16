export const listAllUsernames = /* GraphQL */ `
  query ListAllUsernames($username: String, $limit: Int) {
    listAllUsernames(username: $username, limit: $limit) {
      usernames {
        username
      }
    }
  }
`;

/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  username: string,
  name?: string | null,
  bio?: string | null,
  pronouns?: string | null,
  gender?: string | null,
  followers?: Array< string | null > | null,
  following?: Array< string | null > | null,
  profilePicKey?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  pronouns?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  followers?: ModelStringInput | null,
  following?: ModelStringInput | null,
  profilePicKey?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  username: string,
  name?: string | null,
  bio?: string | null,
  pronouns?: string | null,
  gender?: string | null,
  followers?: Array< string | null > | null,
  following?: Array< string | null > | null,
  profilePicKey?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  username: string,
  name?: string | null,
  bio?: string | null,
  pronouns?: string | null,
  gender?: string | null,
  followers?: Array< string | null > | null,
  following?: Array< string | null > | null,
  profilePicKey?: string | null,
};

export type DeleteUserInput = {
  username: string,
};

export type CreatePostInput = {
  imageKey?: string | null,
  caption?: string | null,
  likes?: number | null,
  comments?: Array< CommentInput | null > | null,
  id?: string | null,
};

export type CommentInput = {
  id?: string | null,
  comment?: string | null,
  likes?: number | null,
};

export type ModelPostConditionInput = {
  imageKey?: ModelStringInput | null,
  caption?: ModelStringInput | null,
  likes?: ModelIntInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Post = {
  __typename: "Post",
  imageKey?: string | null,
  caption?: string | null,
  likes?: number | null,
  comments?:  Array<Comment | null > | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Comment = {
  __typename: "Comment",
  id: string,
  comment?: string | null,
  likes?: number | null,
};

export type UpdatePostInput = {
  imageKey?: string | null,
  caption?: string | null,
  likes?: number | null,
  comments?: Array< CommentInput | null > | null,
  id: string,
};

export type DeletePostInput = {
  id: string,
};

export type ModelUserFilterInput = {
  username?: ModelStringInput | null,
  name?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  pronouns?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  followers?: ModelStringInput | null,
  following?: ModelStringInput | null,
  profilePicKey?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelPostFilterInput = {
  imageKey?: ModelStringInput | null,
  caption?: ModelStringInput | null,
  likes?: ModelIntInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items:  Array<Post | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  username?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  pronouns?: ModelSubscriptionStringInput | null,
  gender?: ModelSubscriptionStringInput | null,
  followers?: ModelSubscriptionStringInput | null,
  following?: ModelSubscriptionStringInput | null,
  profilePicKey?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionPostFilterInput = {
  imageKey?: ModelSubscriptionStringInput | null,
  caption?: ModelSubscriptionStringInput | null,
  likes?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionPostFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    username: string,
    name?: string | null,
    bio?: string | null,
    pronouns?: string | null,
    gender?: string | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    profilePicKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    username: string,
    name?: string | null,
    bio?: string | null,
    pronouns?: string | null,
    gender?: string | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    profilePicKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    username: string,
    name?: string | null,
    bio?: string | null,
    pronouns?: string | null,
    gender?: string | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    profilePicKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    imageKey?: string | null,
    caption?: string | null,
    likes?: number | null,
    comments?:  Array< {
      __typename: "Comment",
      id: string,
      comment?: string | null,
      likes?: number | null,
    } | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    imageKey?: string | null,
    caption?: string | null,
    likes?: number | null,
    comments?:  Array< {
      __typename: "Comment",
      id: string,
      comment?: string | null,
      likes?: number | null,
    } | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    imageKey?: string | null,
    caption?: string | null,
    likes?: number | null,
    comments?:  Array< {
      __typename: "Comment",
      id: string,
      comment?: string | null,
      likes?: number | null,
    } | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  username: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    username: string,
    name?: string | null,
    bio?: string | null,
    pronouns?: string | null,
    gender?: string | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    profilePicKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  username?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      username: string,
      name?: string | null,
      bio?: string | null,
      pronouns?: string | null,
      gender?: string | null,
      followers?: Array< string | null > | null,
      following?: Array< string | null > | null,
      profilePicKey?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    imageKey?: string | null,
    caption?: string | null,
    likes?: number | null,
    comments?:  Array< {
      __typename: "Comment",
      id: string,
      comment?: string | null,
      likes?: number | null,
    } | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      imageKey?: string | null,
      caption?: string | null,
      likes?: number | null,
      comments?:  Array< {
        __typename: "Comment",
        id: string,
        comment?: string | null,
        likes?: number | null,
      } | null > | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    username: string,
    name?: string | null,
    bio?: string | null,
    pronouns?: string | null,
    gender?: string | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    profilePicKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    username: string,
    name?: string | null,
    bio?: string | null,
    pronouns?: string | null,
    gender?: string | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    profilePicKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    username: string,
    name?: string | null,
    bio?: string | null,
    pronouns?: string | null,
    gender?: string | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    profilePicKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  owner?: string | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    imageKey?: string | null,
    caption?: string | null,
    likes?: number | null,
    comments?:  Array< {
      __typename: "Comment",
      id: string,
      comment?: string | null,
      likes?: number | null,
    } | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    imageKey?: string | null,
    caption?: string | null,
    likes?: number | null,
    comments?:  Array< {
      __typename: "Comment",
      id: string,
      comment?: string | null,
      likes?: number | null,
    } | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  owner?: string | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    imageKey?: string | null,
    caption?: string | null,
    likes?: number | null,
    comments?:  Array< {
      __typename: "Comment",
      id: string,
      comment?: string | null,
      likes?: number | null,
    } | null > | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

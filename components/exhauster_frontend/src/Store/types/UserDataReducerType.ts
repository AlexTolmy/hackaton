type UserDataReducerType = {
  userName: UserNameType;
  userRole: UserRole;
};

export type UserNameType = {
  firstName: string;
  secondName: string;
};

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export default UserDataReducerType;

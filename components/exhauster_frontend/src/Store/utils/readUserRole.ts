/* eslint-disable no-useless-escape */
import { isValidNumber } from '../../Utils/confirmValueType';
import { UserRole } from '../types/UserDataReducerType';

function readUserRole(userGroups: string[]): UserRole {
  const { href } = window.location;

  const regExp = /[\s\S]+\-(\d{4,5})\-[\s\S]+/;
  const projectNumber = regExp
    .exec(href)
    ?.find((value) => isValidNumber(Number(value)));

  if (projectNumber) {
    const requiredWords = ['keycloak', 'admin', projectNumber];

    const isAdmin = userGroups.some((group) => {
      const lowerCaseGroup = group.toLowerCase();
      return requiredWords.every((word) => lowerCaseGroup.includes(word));
    });

    return isAdmin ? UserRole.Admin : UserRole.User;
  }

  return process.env.NODE_ENV === 'development'
    ? UserRole.Admin
    : UserRole.User;
}

export default readUserRole;

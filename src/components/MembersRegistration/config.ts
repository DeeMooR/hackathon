import { IMember } from "src/interface"

export const memberAlreadyExist = (arr: IMember[], member: IMember): boolean => {
  return arr.some((obj) => 
    obj.name === member.name &&
    obj.surname === member.surname &&
    obj.group === member.group
  );
}

export const removeMember = (arr: IMember[], member: IMember): IMember[] => {
  return arr.filter((obj) => 
    obj.name !== member.name ||
    obj.surname !== member.surname ||
    obj.group !== member.group
  );
}
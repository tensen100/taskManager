export enum IdentityType {
  IdCard = 0,
  Insurance,
  Passport,
  Military,
  Other
}
export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  projectIds: string[];
  address?: Address;
  identity?: Identity;
  dateOfBirth?: string;
}

export interface Address {
  province: string;
  city: string;
  district: string;
  street?: string;
}

export interface Identity {
  identityNo: string;
  identityType: IdentityType;
}

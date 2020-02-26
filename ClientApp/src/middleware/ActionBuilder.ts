export enum Action {
  CreateUser,
  LoginUser,
  LogoutUser,
  FetchRoster,
  FetchAdventure,
  FetchGroups,
  FetchGroupList,
  CreateCharacter,
  CreateGroup,
  JoinGroup,
  LoginGroup,
  SetSessionToken
}

export const getActionString = (action: Action) => Action[action]

export const CreateServerAction = (action: Action, payload?: any) => ({
  server: true,
  type: action,
  payload
})

export const CreateAction = (action: Action, payload?: any) => ({
  type: action,
  payload
})

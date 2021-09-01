export type RootStateType = {}

export type UserStateType = {
    token: string,
    name: string,
    avatar: string,
    introduction: string,
    roles: string[]
}

export type PermissionStateType = {
    routes: any[],
    addRoutes: any[]
}

export interface AllStateType extends RootStateType {
    user: UserStateType;
    permission: PermissionStateType;
}

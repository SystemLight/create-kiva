export type RootStateType = {}

export type UserStateType = {
    token: string,
    name: string,
    avatar: string,
    introduction: string,
    roles: string[]
}

export interface MenuType {
    index: string,
    title: string,
    link?: string,
    children?: MenuType[];
}

export type PermissionStateType = {
    routes: any[],
    addRoutes: any[],
    menu: MenuType[],
}

export type AppStateType = {
    sidebar: {
        opened: boolean;
        withoutAnimation: boolean;
    },
    device: "pc" | "mobile",
    size: "middle"
}

export interface AllStateType extends RootStateType {
    user: UserStateType;
    permission: PermissionStateType;
    app: AppStateType;
}

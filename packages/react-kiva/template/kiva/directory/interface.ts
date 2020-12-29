export interface IDirectoryData {
    type: "file" | "folder",
    key: string,
    name: string,
    mtime?: string,
    size?: string,
}

export interface IFileRowProps {
    item: IDirectoryData,
    onPreview?: (item: IDirectoryData) => void,
}

export interface IFolderRowProps {
    item: IDirectoryData,
    onClickFolder?: (item: IDirectoryData) => void,
}

export interface IDirectoryProps {
    data: IDirectoryData[],
    onPreview?: (item: IDirectoryData) => void,
    onClickFolder?: (item: IDirectoryData) => void,
}

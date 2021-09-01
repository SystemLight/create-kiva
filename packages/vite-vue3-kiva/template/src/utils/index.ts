export function localGet(key: string) {
    const value = localStorage.getItem(key);
    try {
        if (value) {
            return JSON.parse(value);
        }
    } catch (error) {
        return value;
    }
    return value;
}

export function localSet(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function localRemove(key: string) {
    localStorage.removeItem(key);
}

import { userIdLocalStorageKey } from './config'

export const getDate = (dateString: any) => new Date(dateString)
export const getFormattedDate = (dateString: any) => {
    const date = new Date(dateString)
    const hour = date.getHours()
    return `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}, ${
        hour > 12 ? hour - 12 : hour
    }:${date.getMinutes()} ${hour >= 12 ? 'PM' : 'AM'}`
}

export const validUserId = (userId: string) => userId.match(/^[0-9]+$/)

export const storage = {
    get: (key: string) => window.localStorage.getItem(key),
    set: (key: string, value: any) => window.localStorage.setItem(key, value)
}

export const getUserIdFromStorage = () => storage.get(userIdLocalStorageKey) || ''
export const setUserIdToStorage = (userId: string) => storage.set(userIdLocalStorageKey, userId)

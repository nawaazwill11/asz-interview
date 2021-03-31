import { userIdLocalStorageKey } from './config'

export const getDate = (dateString: any) => new Date(dateString)

export const validUserId = (userId: string) => userId.match(/^[0-9]+$/)

export const storage = {
    get: (key: string) => window.localStorage.getItem(key),
    set: (key: string, value: any) => window.localStorage.setItem(key, value)
}

export const getUserIdFromStorage = () => storage.get(userIdLocalStorageKey) || ''
export const setUserIdToStorage = (userId: string) => storage.set(userIdLocalStorageKey, userId)

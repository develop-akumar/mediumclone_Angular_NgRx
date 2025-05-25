import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PersistanceService {
    set(key: string, data: unknown): void {
        try {
            localStorage.setItem(key, JSON.stringify(data))
        }
        catch (e) {
            console.error('Error saving to localStorage = ', e);
        }
    }

    get(key: string): unknown {
        try {
            const localStorageItem = localStorage.getItem(key)
            return localStorageItem ? JSON.parse(localStorageItem) : null
        }
        catch (e) {
            console.error('Error getting from localStorage = ', e);
            // if we get error, then our code will not break 
            // also the error "Not all code paths return a value.ts(7030)" will be vanished"
            return null
        }
    }
}
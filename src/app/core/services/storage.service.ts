import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    async set(key: string, value: any): Promise<void> {
        localStorage.setItem(key, JSON.stringify(value));
    }

    async get<T>(key: string): Promise<T | null> {
        const item = localStorage.getItem(key);
        if (!item) return null;
        try {
            return JSON.parse(item) as T;
        } catch (e) {
            return null;
        }
    }

    async remove(key: string): Promise<void> {
        localStorage.removeItem(key);
    }
}

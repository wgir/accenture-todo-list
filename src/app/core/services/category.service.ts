import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private categoriesSubject = new BehaviorSubject<Category[]>([]);
    public categories$ = this.categoriesSubject.asObservable();
    private readonly STORAGE_KEY = 'categories';

    constructor(private storageService: StorageService) {
        this.loadCategories();
    }

    private async loadCategories() {
        const categories = await this.storageService.get<Category[]>(this.STORAGE_KEY);
        if (categories) {
            this.categoriesSubject.next(categories);
        } else {
            // Default categories
            const defaults: Category[] = [
                { id: '1', name: 'Personal', color: '#FF5733', icon: 'person' },
                { id: '2', name: 'Work', color: '#33FF57', icon: 'briefcase' },
                { id: '3', name: 'Shopping', color: '#3357FF', icon: 'cart' }
            ];
            this.categoriesSubject.next(defaults);
            this.saveCategories(defaults);
        }
    }

    async addCategory(category: Category) {
        const current = this.categoriesSubject.value;
        const updated = [...current, category];
        this.categoriesSubject.next(updated);
        await this.saveCategories(updated);
    }

    async updateCategory(category: Category) {
        const current = this.categoriesSubject.value;
        const updated = current.map(c => c.id === category.id ? category : c);
        this.categoriesSubject.next(updated);
        await this.saveCategories(updated);
    }

    async deleteCategory(id: string) {
        const current = this.categoriesSubject.value;
        const updated = current.filter(c => c.id !== id);
        this.categoriesSubject.next(updated);
        await this.saveCategories(updated);
    }

    private async saveCategories(categories: Category[]) {
        await this.storageService.set(this.STORAGE_KEY, categories);
    }

    getCategoryById(id: string): Category | undefined {
        return this.categoriesSubject.value.find(c => c.id === id);
    }
}

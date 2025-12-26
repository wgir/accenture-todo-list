import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonItem, IonInput, IonModal } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';
import { addIcons } from 'ionicons';
import { trash, add, close, create, pencil } from 'ionicons/icons';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.page.html',
    styleUrls: ['./categories.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonItem, IonInput, IonModal
    ]
})
export class CategoriesPage {
    categories$ = this.categoryService.categories$;

    isModalOpen = false;
    editingId: string | null = null;

    modalTitle = 'New Category';
    catName = '';
    catColor = '#6200EE';

    constructor(private categoryService: CategoryService) {
        addIcons({ trash, add, close, create, pencil });
    }

    openAddModal() {
        this.editingId = null;
        this.modalTitle = 'New Category';
        this.catName = '';
        this.catColor = '#6200EE';
        this.isModalOpen = true;
    }

    openEditModal(category: Category) {
        this.editingId = category.id;
        this.modalTitle = 'Edit Category';
        this.catName = category.name;
        this.catColor = category.color;
        this.isModalOpen = true;
    }

    saveCategory() {
        if (!this.catName.trim()) return;

        if (this.editingId) {
            this.categoryService.updateCategory({
                id: this.editingId,
                name: this.catName,
                color: this.catColor
            });
        } else {
            this.categoryService.addCategory({
                id: Date.now().toString(),
                name: this.catName,
                color: this.catColor
            });
        }

        this.isModalOpen = false;
    }

    deleteCategory(id: string) {
        this.categoryService.deleteCategory(id);
    }

    setOpen(isOpen: boolean) {
        this.isModalOpen = isOpen;
    }
}

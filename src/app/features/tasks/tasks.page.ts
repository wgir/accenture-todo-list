import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonChip, IonLabel, IonCard, IonItem, IonCheckbox, IonModal, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, trash, add, create, close } from 'ionicons/icons';
import { TaskService } from '../../core/services/task.service';
import { CategoryService } from '../../core/services/category.service';
import { Task } from '../../core/models/task.model';
import { Category } from '../../core/models/category.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: ['./tasks.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon,
        IonChip, IonLabel, IonCard, IonItem, IonCheckbox, IonModal, IonInput, IonSelect, IonSelectOption
    ]
})
export class TasksPage {
    tasks$ = this.taskService.tasks$;
    categories$ = this.categoryService.categories$;

    selectedCategory: string | null = null;
    isModalOpen = false;

    newTaskTitle = '';
    newTaskCategory = '';

    constructor(
        private taskService: TaskService,
        private categoryService: CategoryService
    ) {
        addIcons({ checkmarkCircle, trash, add, create, close });
    }

    get filteredTasks() {
        // This should be done properly with observables in a real app, 
        // but getter is fine for simple use case
        // We will implement a better pipe or subscribe usage if needed.
        // For now, let's just iterate in the template or use a transform.
        return null;
    }

    addTask() {
        if (!this.newTaskTitle.trim()) return;

        this.taskService.addTask({
            id: Date.now().toString(),
            title: this.newTaskTitle,
            isCompleted: false,
            createdAt: Date.now(),
            categoryId: this.newTaskCategory || undefined
        });

        this.newTaskTitle = '';
        this.newTaskCategory = '';
        this.isModalOpen = false;
    }

    deleteTask(id: string) {
        this.taskService.deleteTask(id);
    }

    toggleComplete(id: string) {
        this.taskService.toggleCompletion(id);
    }

    setOpen(isOpen: boolean) {
        this.isModalOpen = isOpen;
    }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonChip, IonLabel, IonCard, IonItem, IonCheckbox, IonModal, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, trash, add, create, close } from 'ionicons/icons';
import { TaskService } from '../../core/services/task.service';
import { CategoryService } from '../../core/services/category.service';
import { Task } from '../../core/models/task.model';
import { Category } from '../../core/models/category.model';
import { FormsModule } from '@angular/forms';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { Platform } from '@ionic/angular/standalone';

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
export class TasksPage implements OnInit {
    tasks$ = this.taskService.tasks$;
    categories$ = this.categoryService.categories$;

    selectedCategory: string | null = null;
    isModalOpen = false;

    pageTitle = 'My Tasks';
    newTaskTitle = '';
    newTaskCategory = '';

    constructor(
        private taskService: TaskService,
        private categoryService: CategoryService,
        private firebaseX: FirebaseX,
        private platform: Platform
    ) {
        addIcons({ checkmarkCircle, trash, add, create, close });
    }

    ngOnInit() {
        this.platform.ready().then((source) => {
            this.fetchRemoteConfig();
        });
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

    async fetchRemoteConfig() {
        try {
            if (!this.firebaseX) {
                return;
            }

            await this.firebaseX.fetch(0);

            const activated = await this.firebaseX.activateFetched();

            const value = await this.firebaseX.getValue('new_title');

            if (value !== undefined && value !== null && value !== '') {
                this.pageTitle = value.toString();
            } else {
                console.warn('Value for "new_title" is empty or null. Check Firebase Console.');
                // Try getAll as a fallback/debug
                this.firebaseX.getAll((values) => {
                    console.log('Fallback - All Config Values:', JSON.stringify(values));
                }, (err) => {
                    console.error('Error in getAll:', err);
                });
            }
        } catch (err) {
            console.error('CRITICAL ERROR during Remote Config:', err);
        }
    }
}

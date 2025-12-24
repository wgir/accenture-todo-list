import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    public tasks$ = this.tasksSubject.asObservable();
    private readonly STORAGE_KEY = 'tasks';

    constructor(private storageService: StorageService) {
        this.loadTasks();
    }

    private async loadTasks() {
        const tasks = await this.storageService.get<Task[]>(this.STORAGE_KEY);
        if (tasks) {
            this.tasksSubject.next(tasks);
        }
    }

    async addTask(task: Task) {
        const current = this.tasksSubject.value;
        const updated = [task, ...current];
        this.tasksSubject.next(updated);
        await this.saveTasks(updated);
    }

    async updateTask(task: Task) {
        const current = this.tasksSubject.value;
        const updated = current.map(t => t.id === task.id ? task : t);
        this.tasksSubject.next(updated);
        await this.saveTasks(updated);
    }

    async deleteTask(id: string) {
        const current = this.tasksSubject.value;
        const updated = current.filter(t => t.id !== id);
        this.tasksSubject.next(updated);
        await this.saveTasks(updated);
    }

    async toggleCompletion(id: string) {
        const current = this.tasksSubject.value;
        const updated = current.map(t => {
            if (t.id === id) {
                return { ...t, isCompleted: !t.isCompleted };
            }
            return t;
        });
        this.tasksSubject.next(updated);
        await this.saveTasks(updated);
    }

    private async saveTasks(tasks: Task[]) {
        await this.storageService.set(this.STORAGE_KEY, tasks);
    }
}

import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'tasks',
                loadComponent: () =>
                    import('../features/tasks/tasks.page').then((m) => m.TasksPage),
            },
            {
                path: 'categories',
                loadComponent: () =>
                    import('../features/categories/categories.page').then((m) => m.CategoriesPage),
            },
            {
                path: '',
                redirectTo: '/tabs/tasks',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/tasks',
        pathMatch: 'full',
    },
];

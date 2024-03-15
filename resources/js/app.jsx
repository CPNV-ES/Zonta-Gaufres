import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Navbar from './Components/Navbar';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <Navbar />
                <div className='h-full rounded-xl w-full border-2 border-gray-300 shadow-offset overflow-auto'>
                    <App {...props} />
                </div>
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
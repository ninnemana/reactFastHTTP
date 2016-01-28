import React from 'react';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import CategoryStore from './stores/CategoryStore';
// import LookupStore from './stores/LookupStore';

const router = new Router(on => {
    on('*', async (state, next) => {
        CategoryStore.getState();
        // LookupStore.getState();

        const component = await next();
        const app = (
            <App context={state.context}>{component}</App>
        );
        return component && app;
    });

    on('/contact', async () => <ContactPage />);

    on('/login', async () => <LoginPage />);

    on('/register', async () => <RegisterPage />);

    on('*', async (state) => {
        const response = await fetch(`/api/content?path=${state.path}`);
        const content = await response.json();
        return response.ok && content && <ContentPage {...content} />;
    });

    on('error', (state, error) => state.statusCode === 404 ?
        <App context={state.context} error={error}><NotFoundPage /></App> :
        <App context={state.context} error={error}><ErrorPage /></App>
    );
});

export default router;

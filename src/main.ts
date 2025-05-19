// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './app/auth/store.ts/reducers';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        provideStore(),
        provideState(authFeatureKey, authReducer),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: false,
            autoPause: true,
            trace: false,
            traceLimit: 75,
        })

    ]
})



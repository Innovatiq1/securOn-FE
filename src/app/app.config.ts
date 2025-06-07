import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// perfect scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxPermissionsModule } from 'ngx-permissions';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { NgxEchartsModule } from 'ngx-echarts';
import { StoreModule } from '@ngrx/store';
import { VulnerabilitiesService } from './services/api/vulnerabilities.service';
import { VulnerabilityDataService } from './services/api/shared.service';
import { ToastrModule } from 'ngx-toastr';
import { vulnerabilitiesReducer } from './store/vulnerabilities.reducers';

import { MsalBroadcastService, MsalGuard, MsalInterceptor, MsalService, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType, BrowserCacheLocation } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


const clientId = '9bb52b25-f72e-42c8-abbe-51f8fd9bc711';
const tenantId = '1b255047-44c1-4d68-a1e3-22b00348e5ee';
// const authority = `https://login.microsoftonline.com/${tenantId}`;
const authority = 'https://login.microsoftonline.com/common';

export function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: clientId,
      authority: authority,
      redirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: false,
    }
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Popup, // Changed from Redirect
    authRequest: {
      scopes: ['user.read']
    }
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Popup, // Changed from Redirect
    protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', ['user.read']],
      ['api://97cbe69d-9da9-4c94-9ea7-304d864582f5/', ['api://97cbe69d-9da9-4c94-9ea7-304d864582f5/access_as_user']]
    ])
  };
}


// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return {
//     interactionType: InteractionType.Redirect,
//     authRequest: {
//       scopes: ['user.read'] // Add your scopes here
//     }
//   };
// }

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap: new Map([
//       ['https://graph.microsoft.com/v1.0/me', ['user.read']],
//       ['api://97cbe69d-9da9-4c94-9ea7-304d864582f5/', ['api://97cbe69d-9da9-4c94-9ea7-304d864582f5/access_as_user']]
//     ])
//   };
// }

export const appConfig: ApplicationConfig = {
  providers: [
    VulnerabilitiesService,
    VulnerabilityDataService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding()
    ),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
  
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      NgxPermissionsModule.forRoot(),
      StoreModule.forRoot(),
      TablerIconsModule.pick(TablerIcons),
      NgScrollbarModule,  
      ToastrModule.forRoot(),
      StoreModule.forFeature('vulnerabilities', vulnerabilitiesReducer), 
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts'),
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};

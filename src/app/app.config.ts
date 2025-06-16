import {
  ApplicationConfig,
  APP_INITIALIZER,
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

import { NgxEchartsModule } from 'ngx-echarts';
import { StoreModule } from '@ngrx/store';
import { VulnerabilitiesService } from './services/api/vulnerabilities.service';
import { VulnerabilityDataService } from './services/api/shared.service';
import { ToastrModule } from 'ngx-toastr';
import { vulnerabilitiesReducer } from './store/vulnerabilities.reducers';

import { 
  MsalBroadcastService, 
  MsalGuard, 
  MsalInterceptor, 
  MsalModule, 
  MsalService, 
  MSAL_INSTANCE, 
  MSAL_GUARD_CONFIG, 
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';
import { 
  BrowserCacheLocation, 
  InteractionType, 
  LogLevel, 
  PublicClientApplication, 
  IPublicClientApplication 
} from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalInitService } from './services/msal-init.service';

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const clientId = '9bb52b25-f72e-42c8-abbe-51f8fd9bc711';
const authority = 'https://login.microsoftonline.com/common';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId,
      authority,
      redirectUri: window.location.origin,
      postLogoutRedirectUri: window.location.origin + '/authentication/login',
      navigateToLoginRequestUrl: true
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: false
    },
    system: {
      loggerOptions: {
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false
      },
      windowHashTimeout: 60000,
      iframeHashTimeout: 6000,
      loadFrameTimeout: 0
    }
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: ['user.read']
    },
    loginFailedRoute: '/authentication/login'
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', ['user.read']],
      ['api://97cbe69d-9da9-4c94-9ea7-304d864582f5/', ['api://97cbe69d-9da9-4c94-9ea7-304d864582f5/access_as_user']]
    ])
  };
}

// Factory function for APP_INITIALIZER
export function initializeMsal(msalService: MsalService) {
  return async () => {
    try {
      const msalInstance = MSALInstanceFactory();
      await msalInstance.initialize();
      console.log('MSAL initialized successfully');
      
      // Handle redirect promise
      await msalInstance.handleRedirectPromise().catch(error => {
        console.error('Error handling redirect:', error);
      });
      
      return true;
    } catch (error) {
      console.error('Failed to initialize MSAL:', error);
      throw error;
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    VulnerabilitiesService,
    VulnerabilityDataService,
    MsalInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMsal,
      deps: [MsalService],
      multi: true
    },
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
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    importProvidersFrom(
      MsalModule.forRoot(
        MSALInstanceFactory(),
        MSALGuardConfigFactory(),
        MSALInterceptorConfigFactory()
      )
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding()
    ),
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

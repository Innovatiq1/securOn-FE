import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { vulnerabilitiesReducer } from "./vulnerabilities.reducers"
import {VulnerablitiesEffects } from "./vulnerabilities.effects";

@NgModule({
    imports: [
        StoreModule.forFeature('vulnerabilities', vulnerabilitiesReducer),
        EffectsModule.forFeature([VulnerablitiesEffects])
    ]
})
export class VulnerabilitiesStoreModule {}
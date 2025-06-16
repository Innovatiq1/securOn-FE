import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { LogCveService } from 'src/app/services/api/log-cve.service';
import { ScanTypeService } from 'src/app/services/api/scan-type.service';

@Component({
  selector: 'app-scan-type-create-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './scan-type-create-dialog.component.html',
  styleUrl: './scan-type-create-dialog.component.scss'
})
export class ScanTypeCreateDialogComponent implements OnInit {
  form: FormGroup;

  assets: any[] = [];
  brands: string[] = [];
  projects: string[] = [];
  osTypes: string[] = [];
  types: string[] = [];
  firmwares: string[] = [];
  serialNos: string[] = [];
  partNos: string[] = [];
  severityTypes = ['Critical', 'High', 'Medium', 'Low']; // Mock NIST
  cvssScores = Array.from({ length: 101 }, (_, i) => (i * 0.1).toFixed(1));

  optionsMap: { [key: string]: string[] } = {};

  alertMessage: string | null = null;
  alertType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'success';

  constructor(
    public dialogRef: MatDialogRef<ScanTypeCreateDialogComponent>,
    private fb: FormBuilder,
    private logCveService: LogCveService,
    private scanTypeService: ScanTypeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      brand: [[]],
      project: [[]],
      osType: [[]],
      type: [[]],
      firmware: [[]],
      serialNo: [[]],
      partNo: [[]],
      severityType: [[]],
      cvssScore: [[]],
      scanType: [false], // false = Manual, true = Automatic
    });
  }

  ngOnInit() {
    this.logCveService.loadAllAssets().subscribe((assets: any[]) => {
      this.assets = assets;
      this.brands = this.getUniqueValues(assets, 'vendor');
      this.projects = this.getUniqueValues(assets, 'project');
      this.osTypes = this.getUniqueValues(assets, 'osType');
      this.types = this.getUniqueValues(assets, 'type');
      this.firmwares = this.getUniqueValues(assets, 'firmwareVersion');
      this.serialNos = this.getUniqueValues(assets, 'serialNo');
      this.partNos = this.getUniqueValues(assets, 'partNo');
      // Add 'All' option at the start
      this.brands.unshift('All');
      this.projects.unshift('All');
      this.osTypes.unshift('All');
      this.types.unshift('All');
      this.firmwares.unshift('All');
      this.serialNos.unshift('All');
      this.partNos.unshift('All');
      // Update optionsMap for toggleAllSelection
      this.updateOptionsMap();
    });
  }

  getUniqueValues(arr: any[], key: string): string[] {
    return Array.from(new Set(arr.map(item => item[key]).filter(Boolean)));
  }

  updateOptionsMap() {
    this.optionsMap = {
      brand: this.brands,
      project: this.projects,
      osType: this.osTypes,
      type: this.types,
      firmware: this.firmwares,
      serialNo: this.serialNos,
      partNo: this.partNos,
      severityType: this.severityTypes,
      cvssScore: this.cvssScores.map(String),
    };
  }

  onBrandChange() {
    const selectedProjects = this.form.value.project;
    const selectedBrands = this.form.value.brand;
    let filtered = this.assets;

    if (selectedProjects && selectedProjects.length && !selectedProjects.includes('All')) {
      filtered = filtered.filter(a => selectedProjects.includes(a.project));
    }
    if (selectedBrands && selectedBrands.length && !selectedBrands.includes('All')) {
      filtered = filtered.filter(a => selectedBrands.includes(a.vendor));
    }

    this.osTypes = this.getUniqueValues(filtered, 'osType');
    this.osTypes.unshift('All');
    this.form.get('osType')?.setValue([]);
    this.onOsTypeChange();
    this.updateOptionsMap();
  }

  onProjectChange() {
    const selectedProjects = this.form.value.project;
    let filtered = this.assets;

    if (selectedProjects && selectedProjects.length && !selectedProjects.includes('All')) {
      filtered = filtered.filter(a => selectedProjects.includes(a.project));
    }

    // Filter brands/vendors based on selected projects
    this.brands = this.getUniqueValues(filtered, 'vendor');
    this.brands.unshift('All');
    this.form.get('brand')?.setValue([]);

    // Now filter the next dropdowns as before
    this.osTypes = this.getUniqueValues(filtered, 'osType');
    this.osTypes.unshift('All');
    this.form.get('osType')?.setValue([]);
    this.onOsTypeChange();
    this.updateOptionsMap();
  }

  onOsTypeChange() {
    const selectedBrands = this.form.value.brand;
    const selectedProjects = this.form.value.project;
    const selectedOsTypes = this.form.value.osType;
    let filtered = this.assets;
    if (selectedBrands && selectedBrands.length && !selectedBrands.includes('All')) {
      filtered = filtered.filter(a => selectedBrands.includes(a.vendor));
    }
    if (selectedProjects && selectedProjects.length && !selectedProjects.includes('All')) {
      filtered = filtered.filter(a => selectedProjects.includes(a.project));
    }
    if (selectedOsTypes && selectedOsTypes.length && !selectedOsTypes.includes('All')) {
      filtered = filtered.filter(a => selectedOsTypes.includes(a.osType));
    }
    this.types = this.getUniqueValues(filtered, 'type');
    this.types.unshift('All');
    this.form.get('type')?.setValue([]);
    this.onTypeChange();
    this.updateOptionsMap();
  }

  onTypeChange() {
    const selectedBrands = this.form.value.brand;
    const selectedProjects = this.form.value.project;
    const selectedOsTypes = this.form.value.osType;
    const selectedTypes = this.form.value.type;
    let filtered = this.assets;
    if (selectedBrands && selectedBrands.length && !selectedBrands.includes('All')) {
      filtered = filtered.filter(a => selectedBrands.includes(a.vendor));
    }
    if (selectedProjects && selectedProjects.length && !selectedProjects.includes('All')) {
      filtered = filtered.filter(a => selectedProjects.includes(a.project));
    }
    if (selectedOsTypes && selectedOsTypes.length && !selectedOsTypes.includes('All')) {
      filtered = filtered.filter(a => selectedOsTypes.includes(a.osType));
    }
    if (selectedTypes && selectedTypes.length && !selectedTypes.includes('All')) {
      filtered = filtered.filter(a => selectedTypes.includes(a.type));
    }
    this.firmwares = this.getUniqueValues(filtered, 'firmwareVersion');
    this.firmwares.unshift('All');
    this.form.get('firmware')?.setValue([]);
    this.onFirmwareChange();
    this.updateOptionsMap();
  }

  onFirmwareChange() {
    const selectedBrands = this.form.value.brand;
    const selectedProjects = this.form.value.project;
    const selectedOsTypes = this.form.value.osType;
    const selectedTypes = this.form.value.type;
    const selectedFirmwares = this.form.value.firmware;
    let filtered = this.assets;
    if (selectedBrands && selectedBrands.length && !selectedBrands.includes('All')) {
      filtered = filtered.filter(a => selectedBrands.includes(a.vendor));
    }
    if (selectedProjects && selectedProjects.length && !selectedProjects.includes('All')) {
      filtered = filtered.filter(a => selectedProjects.includes(a.project));
    }
    if (selectedOsTypes && selectedOsTypes.length && !selectedOsTypes.includes('All')) {
      filtered = filtered.filter(a => selectedOsTypes.includes(a.osType));
    }
    if (selectedTypes && selectedTypes.length && !selectedTypes.includes('All')) {
      filtered = filtered.filter(a => selectedTypes.includes(a.type));
    }
    if (selectedFirmwares && selectedFirmwares.length && !selectedFirmwares.includes('All')) {
      filtered = filtered.filter(a => selectedFirmwares.includes(a.firmwareVersion));
    }
    this.serialNos = this.getUniqueValues(filtered, 'serialNo');
    this.serialNos.unshift('All');
    this.form.get('serialNo')?.setValue([]);
    this.onSerialNoChange();
    this.updateOptionsMap();
  }

  onSerialNoChange() {
    const selectedBrands = this.form.value.brand;
    const selectedProjects = this.form.value.project;
    const selectedOsTypes = this.form.value.osType;
    const selectedTypes = this.form.value.type;
    const selectedFirmwares = this.form.value.firmware;
    const selectedSerialNos = this.form.value.serialNo;
    let filtered = this.assets;
    if (selectedBrands && selectedBrands.length && !selectedBrands.includes('All')) {
      filtered = filtered.filter(a => selectedBrands.includes(a.vendor));
    }
    if (selectedProjects && selectedProjects.length && !selectedProjects.includes('All')) {
      filtered = filtered.filter(a => selectedProjects.includes(a.project));
    }
    if (selectedOsTypes && selectedOsTypes.length && !selectedOsTypes.includes('All')) {
      filtered = filtered.filter(a => selectedOsTypes.includes(a.osType));
    }
    if (selectedTypes && selectedTypes.length && !selectedTypes.includes('All')) {
      filtered = filtered.filter(a => selectedTypes.includes(a.type));
    }
    if (selectedFirmwares && selectedFirmwares.length && !selectedFirmwares.includes('All')) {
      filtered = filtered.filter(a => selectedFirmwares.includes(a.firmwareVersion));
    }
    if (selectedSerialNos && selectedSerialNos.length && !selectedSerialNos.includes('All')) {
      filtered = filtered.filter(a => selectedSerialNos.includes(a.serialNo));
    }
    this.partNos = this.getUniqueValues(filtered, 'partNo');
    this.partNos.unshift('All');
    this.form.get('partNo')?.setValue([]);
    this.updateOptionsMap();
  }

  toggleAllSelection(field: string) {
    const control = this.form.get(field) as FormControl;
    const allValue = 'All';
    const options = (this.optionsMap[field] || []);
    const allOptions = options.filter((v: string) => v !== allValue);
    const selected = control.value || [];

    if (selected.includes(allValue)) {
      if (selected.length === 1) {
        control.setValue([allValue, ...allOptions]);
        return;
      }
      if (selected.length === options.length) {
        control.setValue([]);
        return;
      }
    }
    if (allOptions.every((v: string) => selected.includes(v)) && selected.length === allOptions.length) {
      control.setValue([allValue, ...allOptions]);
      return;
    }
    if (selected.includes(allValue) && selected.length < options.length) {
      control.setValue(selected.filter((v: string) => v !== allValue));
      return;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  showAlert(type: typeof this.alertType, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => this.alertMessage = null, 4000);
  }

  onSave(): void {
    if (this.form.valid) {
      // Deep copy the form value
      const payload = { ...this.form.value };

      // Remove "All" from all array fields
      Object.keys(payload).forEach(key => {
        if (Array.isArray(payload[key])) {
          payload[key] = payload[key].filter((v: string) => v !== 'All');
        }
      });

      this.scanTypeService.saveScanType(payload).subscribe({
        next: (res) => {
          this.showAlert('success', 'Scan type saved successfully!');
          setTimeout(() => {
            this.dialogRef.close(payload);
          }, 1000);
        },
        error: (err) => {
          console.error('Save failed', err);
          this.showAlert('danger', 'Failed to save scan type!');
        }
      });
    }
  }
}

import {Component, OnInit} from '@angular/core';

import {
  NgFilesService,
  NgFilesConfig,
  NgFilesStatus,
  NgFilesSelected
} from './ng-files';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public selectedFiles;

  private sharedConfig: NgFilesConfig = {
    acceptExtensions: ['jpg'],
    maxFilesCount: 5
  };

  private namedConfig: NgFilesConfig = {
    acceptExtensions: ['js', 'doc', 'mp4'],
    maxFilesCount: 5,
    maxFileSize: 512000,
    totalFilesSize: 1012000
  };

  constructor(
      private ng4FilesService: NgFilesService
  ) {}

  ngOnInit() {
    this.ng4FilesService.addConfig(this.sharedConfig);
    this.ng4FilesService.addConfig(this.namedConfig, 'another-config');
  }

  public filesSelect(selectedFiles: NgFilesSelected): void {
    console.log(selectedFiles)
    if (selectedFiles.status !== NgFilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
    }

    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
  }

}

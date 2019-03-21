[![https://nodei.co/npm/angular-files-upload.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/angular-files-upload.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/angular-files-upload)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/angular-files-upload.svg)](https://badge.fury.io/js/angular-files-upload)
[![Build Status](https://travis-ci.org/bonjurmrfirst/ng-files.svg?branch=master)](https://travis-ci.org/bonjurmrfirst/ng-files)

[Project is not supported]

# angular-files-upload

Upload files by clicking or dragging


## Getting started

`npm i --save angular-files-upload`

Add following lines into your

**module:**

```typescript
import { ngFilesModule } from './ng-files';
```

add ngFilesModule to your module imports section<br/>
```typescript
imports: [ ngFilesModule ]
```

<br/>

**component template:**

Upload by click:
```html
<ng-files-click (filesSelect)="filesSelect($event)">
  <span>Click me to upload</span>
</ng-files-click>
```

Upload with drag'n'drop:
```html
<ng-files-drop (filesSelect)="filesSelect($event)">
  <div style="display: inline-block; height: 100px; width: 100px; background-color: gray">
    {{selectedFiles}}
  </div>
</ng-files-drop>
```

<br/>

**component ts:**
 
```typescript
import {
  ngFilesStatus,
  ngFilesSelected
} from './ng-files';
 
...
 
public selectedFiles;
 
public filesSelect(selectedFiles: ngFilesSelected): void {
    if (selectedFiles.status !== ngFilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
      
      // Hnadle error statuses here
    }

    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
  }

```

##Configure

To pass config to angular-files-upload add following lines to you component.ts file:

### Shared Config

```typescript
import {
  ngFilesService,
  ngFilesConfig,
} from './ng-files';
 
...
 
constructor(
      private ngFilesService: ngFilesService
  ) {}
 
private testConfig: ngFilesConfig = {
    acceptExtensions: ['js', 'doc', 'mp4'],
    maxFilesCount: 5,
    maxFileSize: 5120000,
    totalFilesSize: 10120000
  };
   
ngOnInit() {
    this.ngFilesService.addConfig(this.testConfig);
}
```

### Private configs

Config added this way <br>
`this.ngFilesService.addConfig(this.testConfig);`<br>
is shared config. All components will use it.

But you can add multiple configs for your upload components.<br>
Let's say, you have two upload components and you want to allow user upload just one video and 5(max) images.<br>
To do this create 2 configs and pass it to upload components as named configs.

.ts

```typescript
import {
  ngFilesService,
  ngFilesConfig,
  ngFilesStatus,
  ngFilesSelected
} from './ng-files';
 
 ...
 
public selectedFiles; 
 
private configImage: ngFilesConfig = {
    acceptExtensions: ['jpg', 'jpeg'],
    maxFilesCount: 5,
    totalFilesSize: 101200000
  };
  
private configVideo: ngFilesConfig = {
    acceptExtensions: ['mp4', 'avi'],
    maxFilesCount: 1
  };  
 
constructor(
      private ngFilesService: ngFilesService
  ) {}

  ngOnInit() {
    this.ngFilesService.addConfig(this.configImage, 'my-image-config');
    this.ngFilesService.addConfig(this.configVideo, 'my-video-config');
  }

  public filesSelect(selectedFiles: ngFilesSelected): void {
    if (selectedFiles.status !== ngFilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
    }
 
    // Handle error statuses here
 
    this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);
  } 
 
```

.html

```html
<ng-files-click (filesSelect)="filesSelect($event)" [configId]="'my-image-config'">
  <span>Upload</span>
</ng-files-click>
 

<ng-files-drop (filesSelect)="filesSelect($event)" [configId]="'my-video-config'">
  <div style="display: inline-block; height: 100px; width: 100px; background-color: gray">
    {{selectedFiles}}
  </div>
</ng-files-drop>
```  
  
  
## API

### Config

_acceptExtensions_ <br/>
values: string[] or \'\*\' <br/>
examples: ['ts', 'spec.ts'], ['js'], '*'

_maxFilesCount_: <br/>
values: [number] <br/>

_maxFileSize:_ <br/>
values: [number] (bytes)
 
_totalFilesSize:_ <br/>
values: [number] (bytes)

### Template

<ng-files-click _(filesSelect)_="YOUR_HANDLER($event)" _[configId]_="YOUR_CONFIG">

_filesSelect_<br> 
emit when files attached and pass ngFilesSelected object to YOUR_HANDLER:

```
export enum ngFilesStatus {
    STATUS_SUCCESS,
    STATUS_MAX_FILES_COUNT_EXCEED,
    STATUS_MAX_FILE_SIZE_EXCEED,
    STATUS_MAX_FILES_TOTAL_SIZE_EXCEED,
    STATUS_NOT_MATCH_EXTENSIONS
}

export interface ngFilesSelected {
  status: ngFilesStatus;
  files: File[];
}
```

_! Note on statuses STATUS_MAX_FILE_SIZE_EXCEED or STATUS_NOT_MATCH_EXTENSIONS you get files not passed validation, so you shouldn't filter it manually to find all invalid files._

_configId_<br>
Pass your named config with configId
<br>

## Caveat
Please don't use button tag in template inside ng-files-click<br>
Don't: ```html
<ng-files-click>
    <button></button>
</ng-files-click>```
<br><br>
ng-files-click content is wrapped in label tag, so prefer something like
````html
<ng-files-click>
    <span role="button" style="btn">Give me file ^.^</button>
</ng-files-click>```
````

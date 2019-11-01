import { JsonEditorOptions } from 'ang-jsoneditor';

export class JsonEditorDefaults extends JsonEditorOptions {

  // any workaround needed until this issue is fixed:
  // https://github.com/mariohmol/ang-jsoneditor/issues/25
  public mainMenuBar: boolean;

  constructor() {
    super();
    this.modes = ['code', 'view'];
    this.mode = 'view';
    this.mainMenuBar = false;
    this.navigationBar = false;
    this.statusBar = false;
  }
}

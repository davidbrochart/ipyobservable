import { DOMWidgetModel, DOMWidgetView } from '@jupyter-widgets/base';
import { Runtime, Inspector } from '@observablehq/runtime';
import { Compiler } from "./unofficial-observablehq-compiler";


export class ObservableModel extends DOMWidgetModel {
    defaults() {
      return {
        ...super.defaults(),
        _model_name : 'ObservableModel',
        _view_name : 'ObservableView',
        _model_module : 'ipyobservable',
        _view_module : 'ipyobservable',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        _runtime: new Runtime(),
        _compile: new Compiler(),
        _nodes: [],
        code: '',
      };
    }
  }

export class ObservableView extends DOMWidgetView {
  render() {
    this.runtime = this.model.get('_runtime');
    this.compile = this.model.get('_compile');
    this.nodes = this.model.get('_nodes');
    if (this.nodes.length === 0) {
      this.code_changed();
    }
    else {
      for (let node of this.nodes) {
        this.el.appendChild(node);
      }
    }
    this.model.on('change:code', this.code_changed, this);
  }

  code_changed() {
    const code = this.model.get('code');
    const compiled_code = this.compile.module(code);
    eval(compiled_code);
    const main = this.runtime.module(this.define, name => {
      const node = document.createElement("DIV");
      this.el.appendChild(node);
      this.nodes.push(node);
      return new Inspector(node);
    });
  }
}

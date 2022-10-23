import {ObservableModel, ObservableView, version} from './index';
import {IJupyterWidgetRegistry} from '@jupyter-widgets/base';

export const observableWidgetPlugin = {
  id: 'ipyobservable:plugin',
  requires: [IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'ipyobservable',
          version: version,
          exports: { ObservableModel, ObservableView }
      });
  },
  autoStart: true
};

export default observableWidgetPlugin;

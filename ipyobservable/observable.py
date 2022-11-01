import ipywidgets as widgets
from traitlets import  Dict, Unicode, validate
from ._version import NPM_PACKAGE_RANGE

# See js/lib/observable.js for the frontend counterpart to this file.

@widgets.register
class Observable(widgets.DOMWidget):

    # Name of the widget view class in front-end
    _view_name = Unicode('ObservableView').tag(sync=True)

    # Name of the widget model class in front-end
    _model_name = Unicode('ObservableModel').tag(sync=True)

    # Name of the front-end module containing widget view
    _view_module = Unicode('ipyobservable').tag(sync=True)

    # Name of the front-end module containing widget model
    _model_module = Unicode('ipyobservable').tag(sync=True)

    # Version of the front-end module containing widget view
    _view_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)
    # Version of the front-end module containing widget model
    _model_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)

    # Widget specific property.
    # Widget properties are defined as traitlets. Any property tagged with `sync=True`
    # is automatically synced to the frontend *any* time it changes in Python.
    # It is synced back to Python from the frontend *any* time the model is touched.
    code = Unicode().tag(sync=True)
    data = Dict()

    @validate("code")
    def _add_data(self, proposal):
        vars = [f"{k} = {v}\n" for k, v in self.data.items()]
        code = "".join(vars) + proposal["value"]
        return code

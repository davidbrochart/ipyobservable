# ipyobservable

Jupyter widget for Observable

## Installation

To install use pip:

    $ pip install ipyobservable

For a development installation (requires [Node.js](https://nodejs.org) and [Yarn version 1](https://classic.yarnpkg.com/)),

    $ git clone https://github.com/davidbrochart/ipyobservable.git
    $ cd ipyobservable
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --overwrite --sys-prefix ipyobservable
    $ jupyter nbextension enable --py --sys-prefix ipyobservable

When actively developing your extension for JupyterLab, run the command:

    $ jupyter labextension develop --overwrite ipyobservable

Then you need to rebuild the JS when you make a code change:

    $ cd js
    $ yarn run build

You then need to refresh the JupyterLab page when your javascript changes.

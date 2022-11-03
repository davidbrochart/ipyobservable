from IPython.core.magic import Magics, magics_class, cell_magic

from .observable import Observable


@magics_class
class ObservableMagics(Magics):

    @cell_magic
    def observable(self, line, cell):
        names = line.split()
        context = self.shell.user_ns
        data = {n: context[n] for n in names}
        o = Observable(code=cell, data=data)
        return o

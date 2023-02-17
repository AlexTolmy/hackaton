from typing import List, Tuple

import falcon
from falcon import App
from spectree import SpecTree
from spectree.models import Server

spectree = SpecTree(
    'falcon',
    mode='strict',
    annotations=True,
    version='v1.0',
    validation_error_status=falcon.HTTP_400,
)


def setup_spectree(
    app: App,
    title: str,
    path: str,
    filename: str,
    servers: List[Tuple[str, str]],
):
    servers = [
        Server(url=url, description=description) for url, description in servers
    ]

    spectree.update_config(
        title=title,
        path=path,
        filename=filename,
        servers=servers,
    )

    spectree.register(app)

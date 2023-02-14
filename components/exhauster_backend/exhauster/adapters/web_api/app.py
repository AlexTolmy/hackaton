from classic.http_api import App

from exhauster.application.dashboard import services

from . import controllers
from .auth import auth
from .join_points import join_points


def create_app(
    app_information: services.AppInformation
) -> App:

    app = App(prefix='/api')

    app.register(controllers.Information(information=app_information))

    # join_points.join(auth)

    return app

import falcon
from classic.http_api import App

from exhauster.application.dashboard import services

from . import controllers
from .settings import SwaggerSettings
from .spec import setup_spectree


def create_app(
    swagger_settings: SwaggerSettings, allow_origins,
    exhauster_service: services.ExhausterService,
    graphic_service: services.GraphicService,
) -> App:

    cors_middleware = falcon.CORSMiddleware(
        allow_origins=allow_origins, expose_headers=['Content-Disposition']
    )
    middleware = [cors_middleware]

    app = App(middleware=middleware, prefix='/api')

    app.register(controllers.Dashboard(service=exhauster_service))
    app.register(controllers.Graphics(service=graphic_service))

    if swagger_settings.ON:
        setup_spectree(
            app=app,
            title=swagger_settings.TITLE,
            path=swagger_settings.PATH,
            filename=swagger_settings.FILENAME,
            servers=swagger_settings.SERVERS,
        )

    return app
import sys

from alembic.config import CommandLine, Config

from exhauster.adapters import database, log


class Settings:
    database = database.Settings()


class Logger:
    log.configure(Settings.database.LOGGING_CONFIG)


def make_config():
    config = Config()
    config.set_main_option(
        'script_location', Settings.database.ALEMBIC_SCRIPT_LOCATION
    )
    config.set_main_option(
        'version_locations', Settings.database.ALEMBIC_VERSION_LOCATIONS
    )
    config.set_main_option('sqlalchemy.url', Settings.database.DATABASE_URL)
    config.set_main_option(
        'file_template', Settings.database.ALEMBIC_MIGRATION_FILENAME_TEMPLATE
    )
    config.set_main_option('compare_type', 'True')
    config.set_main_option('timezone', 'UTC')

    return config


def run_cmd(*args):
    log.configure(Settings.database.LOGGING_CONFIG)

    cli = CommandLine()
    cli.run_cmd(make_config(), cli.parser.parse_args(args))


if __name__ == '__main__':
    if len(sys.argv) > 1:
        run_cmd(*sys.argv[1:])
    else:
        run_cmd('-h')

from typing import List, Optional

from classic.components import component
from classic.sql_storage import BaseRepository
from sqlalchemy import select
from exhauster.application import interfaces
from exhauster.application.dashboard import dto
from . import tables


@component
class ExhausterRepo(BaseRepository, interfaces.ExhausterRepo):

    def all(self) -> List[dto.Exhauster]:

        stmt = select(tables.exhausters).order_by(tables.exhausters.c.number)

        result = self.session.execute(stmt)

        exhausters = []

        for row in result:
            exhausters.append(
                dto.Exhauster(
                    id=row.id,
                    number=row.number,
                    name=row.number,
                    aglomachine=row.aglomachine
                )
            )

        return exhausters

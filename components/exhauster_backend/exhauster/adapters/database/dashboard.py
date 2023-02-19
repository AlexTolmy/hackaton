from datetime import datetime
from typing import List, Optional

from classic.components import component
from classic.sql_storage import BaseRepository
from sqlalchemy import select

from exhauster.application import interfaces
from exhauster.application.dashboard import dto

from . import tables

@component
class RotorRepo(BaseRepository):

    def get(self, exhauster_id: int) -> dto.Rotor:

        stmt = select(tables.rotors).where(tables.rotors.c.exhauster_id == exhauster_id).order_by(tables.rotors.c.created_at.desc()).limit(1)
        row = self.session.execute(stmt).one()

        return dto.Rotor(
            installed_at=row.created_at,
            name=row.name
        )

    def get_prediction(self, exhauster_id: int) -> Optional[datetime]:

        stmt = select(tables.rotors_prediction.c.stop_at).where(tables.rotors_prediction.c.exhauster_id == exhauster_id).order_by(tables.rotors_prediction.c.created_at.desc()).limit(1)

        res = self.session.execute(stmt).one_or_none()

        if res:
            return res.stop_at

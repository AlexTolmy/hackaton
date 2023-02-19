from typing import List, Optional

from classic.components import component
from classic.sql_storage import BaseRepository
from sqlalchemy import select

from exhauster.application import interfaces
from exhauster.application import interfaces as core_interfaces
from exhauster.application.dashboard import dto
from exhauster.application.predictor import dto as predictor_dto

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
                    number=str(row.number),
                    name=row.name,
                    aglomachine=row.aglomachine
                )
            )

        return exhausters

    def get(self, number: str) -> dto.Exhauster:
        stmt = select(tables.exhausters
                      ).where(tables.exhausters.c.number == number
                              ).one_or_none()

        result = self.session.execute(stmt)
        if result:
            return dto.Exhauster(
                id=result.id,
                number=str(result.number),
                name=result.name,
                aglomachine=result.aglomachine
            )


class RotorRepo(BaseRepository, core_interfaces.RotorRepo):

    def all(self, exhauster_number: str) -> List[predictor_dto.Rotor]:

        stmt = select(tables.rotors).order_by(tables.rotors.c.created_at)

        result = self.session.execute(stmt)

        rotors = []

        for row in result:
            rotors.append(
                predictor_dto.Rotor(
                    exhauster_number=row.number, installed_at=row.installed_at
                )
            )

        return rotors


class PredictionsRepo(BaseRepository, interfaces.PredictionsRepo):

    def save(self, prediction: predictor_dto.Prediction):
        query = tables.rotors_prediction.insert().values(
            {
                'exhauster_id': prediction.exhauster_id,
                'stop_at': prediction.stop_at,
            }
        )
        self.session.execute(query)

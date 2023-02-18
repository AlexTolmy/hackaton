from sqlalchemy.orm import registry, relationship

from exhauster.adapters.database import tables
from exhauster.application.dashboard import entities

mapper = registry()

# mapper.map_imperatively(entities.Customer, tables.customers)

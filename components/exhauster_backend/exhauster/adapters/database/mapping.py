from exhauster.adapters.database import tables
from exhauster.application.dashboard import entities
from sqlalchemy.orm import registry, relationship

mapper = registry()

# mapper.map_imperatively(entities.Customer, tables.customers)

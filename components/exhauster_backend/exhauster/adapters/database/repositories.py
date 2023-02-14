from typing import List, Optional

from classic.components import component
from classic.sql_storage import BaseRepository
from sqlalchemy import select

from exhauster.application import interfaces

# @component
# class ProductsRepo(BaseRepository, interfaces.ProductsRepo):
#
#     def find_by_keywords(
#         self,
#         search: str = '',
#         limit: int = 10,
#         offset: int = 0
#     ) -> List[Product]:
#
#         query = (
#             select(Product).order_by(Product.sku).limit(limit).offset(offset)
#         )
#
#         if search is not None:
#             query = query.where(
#                 Product.title.ilike(f'%{search}%')
#                 | Product.description.ilike(f'%{search}%')
#             )
#
#         return self.session.execute(query).scalars()
#
#     def get_by_sku(self, sku: str) -> Optional[Product]:
#         query = select(Product).where(Product.sku == sku)
#         return self.session.execute(query).scalars().one_or_none()
#
#     def add(self, product: Product):
#         self.session.add(product)
#         self.session.flush()

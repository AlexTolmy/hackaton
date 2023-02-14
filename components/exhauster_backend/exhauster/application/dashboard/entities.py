from typing import List, Optional

import attr


@attr.dataclass
class InformationEntity:
    id: Optional[int] = None
    text: Optional[str] = None


# @attr.dataclass
# class Cart:
#     customer_id: int
#     positions: List[CartPosition] = attr.ib(factory=list)
#
#     def find_position(self, product: Product):
#         for position in self.positions:
#             if position.product == product:
#                 return position
#
#     def add_product(self, product: Product, quantity: int):
#         position = self.find_position(product)
#         if position is None:
#             position = CartPosition(product, 0)
#
#         position.quantity += quantity
#
#         self.positions.append(position)
#
#     def remove_product(self, product: Product):
#         position = self.find_position(product)
#         if position is not None:
#             self.positions.remove(position)
#
# @attr.dataclass
# class Order:
#     customer: Customer
#     number: Optional[int] = None
#     lines: List[OrderLine] = attr.ib(factory=list)
#
#     @property
#     def cost(self):
#         return sum((line.price for line in self.lines))

from classic.components import component
from spectree import Response
from spectree.models import Tag

from exhauster.application.dashboard import services

from .join_points import join_point
from .models import TestRequest, TestResponse
from .spec import spectree

tags = (Tag(name='заголовок'), )


@component
class Information:
    information: services.AppInformation

    @join_point
    @spectree.validate(
        query=TestRequest, resp=Response(HTTP_200=TestResponse), tags=tags
    )
    def on_get_information(self, request, response):
        query: TestRequest = request.context.query

        info = self.information.get_version(text=query.text)
        response.media = {'text': info.text, 'id': info.id}

    @join_point
    @spectree.validate(
        query=TestRequest, resp=Response(HTTP_200=TestResponse), tags=tags
    )
    def on_post_error(self, request, response):
        self.information.get_error(**request.media)
        # json_body: AllowedEmailAddRequest = request.context.json
        # self.allowed_emails.add(**json_body.dict(exclude_none=False))


# @component
# class Customers:
#     customers: services.Customer
#
#     @join_point
#     @spectree.validate(
#         query=CustomerID, resp=Response(HTTP_200=Customer), tags=tags
#     )
#     def on_get_customer(self, request, response):
#         query:  CustomerID = request.context.query
#         customer = self.customers.get_costumer(query.id)
#
#         response.media = {
#             'id': customer.id,
#             'email': customer.email
#         }

# @join_point
# def on_post_remove_product_from_cart(self, request, response):
#     self.checkout.remove_product_from_cart(
#         customer_id=request.context.client_id,
#         **request.media,
#     )

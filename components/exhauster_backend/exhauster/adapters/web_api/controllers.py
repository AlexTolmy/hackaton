from classic.components import component

from exhauster.application.dashboard import services

from .join_points import join_point


@component
class Information:
    information: services.AppInformation

    @join_point
    def on_get_information(self, request, response):
        info = self.information.get_version(**request.params)
        response.media = {
            'text': info.text,
            'id': info.id
        }

    @join_point
    def on_post_error(self, request, response):
        self.information.get_error(**request.media)

    # @join_point
    # def on_post_remove_product_from_cart(self, request, response):
    #     self.checkout.remove_product_from_cart(
    #         customer_id=request.context.client_id,
    #         **request.media,
    #     )

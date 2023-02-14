from classic.app.errors import AppError


class TestError(AppError):
    msg_template = "No product with SKU '{sku}'"
    code = 'exhauster.test_error'


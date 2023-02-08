from exhauster.application import interfaces


class Predictor(interfaces.PredictService):

    def predict(self, *arg, **kwargs):
        ...
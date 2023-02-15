const POST = 'POST';

const Paths = {
  RunExperiment: '/api/auto_m_l_trainer/run_experiment',
  RunModel: '/api/orchestrator/run_model',
  StopModel: '/api/orchestrator/stop_model',
};

module.exports = (req, res, next) => {
  const { method, url } = req;
  const isPost = method === POST;
  const isCorrectPath = Object.values(Paths).includes(url);

  setTimeout(() => {
    if (isPost || isCorrectPath) {
      res.json({ status: 'ok' });

      /*  res.status(400).jsonp({
        messages: [
          'В датасете не должно быть пропусков',
          'В датасете  должно быть более 100 строк',
        ],
      }); */
    } else {
      next();
    }
  }, 1000);
};

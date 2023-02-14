FROM python:3.7-buster as build

ENV USERNAME=app
ENV PIP_CONFIG_FILE=/app/pip.conf

COPY ./components/exhauster_backend /app/

WORKDIR /app

RUN pip install --upgrade pip \
    && pip install --no-cache-dir .[dev] \
    && pip install python_libs/spectree-1.0.3.tar.gz \
    && python setup.py bdist_wheel

RUN groupadd -r $USERNAME &&\
    useradd -r -g $USERNAME -d /home/$USERNAME -s /sbin/nologin -c "Docker image user" app

COPY --chown=app:app ./deployment/exhauster_backend/entrypoint*.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint*.sh

WORKDIR /usr/local/lib/python3.7/site-packages/

USER $USERNAME

FROM build as final

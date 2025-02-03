#!/bin/bash

# Poetryのインストール
curl -sSL https://install.python-poetry.org | POETRY_VERSION=1.8.4 python3 -
# pip3 install poetry


# requirements.txt の生成
PATH=$PATH:$HOME/.local/bin poetry install

PATH=$PATH:$HOME/.local/bin poetry --version

PATH=$PATH:$HOME/.local/bin poetry self add poetry-plugin-export
PATH=$PATH:$HOME/.local/bin poetry export -f requirements.txt --output requirements.txt --without-hashes

PATH=$PATH:$HOME/.local/bin poetry run python manage.py collectstatic --noinput

PATH=$PATH:$HOME/.local/bin poetry run python manage.py migrate

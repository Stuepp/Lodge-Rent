FROM python:3.9

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

COPY ./app /app

RUN pip install --no-cache-dir -r /app/requirements.txt

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
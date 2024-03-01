FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

ENV DASHBOARD_PYTHON_PORT=6000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:$DASHBOARD_PYTHON_PORT", "app:app"]

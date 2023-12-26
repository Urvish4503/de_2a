FROM python:3.11.6
WORKDIR /usr/src/
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "de_2a.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
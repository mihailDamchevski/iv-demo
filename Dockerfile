FROM mcr.microsoft.com/playwright:v1.58.0-jammy

ENV CI=true
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .

EXPOSE 8080

CMD ["bash", "-c", "\
  npm start & \
  n=0; \
  until curl -sSf http://localhost:8080/todo || [ $n -ge 20 ]; do \
    echo 'Waiting for app...'; \
    sleep 2; \
    n=$((n+1)); \
  done && \
  npx playwright test \
"]

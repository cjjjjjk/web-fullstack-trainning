# dockerfile minh hoạ 

# xác định image cơ sở
FROM python:3.12-slim
# metadata                           
LABEL maintainer="Haihv <haihv@hai.com>"

# biến môi trường và chỉ định thư mục làm việc
ENV APP_DIR=/app
WORKDIR $APP_DIR

# sao chép thư mục hiện tại sang thư mục làm việc container /app
COPY . .
# lệnh thực thi khi xây dựng dockerimage, cài đặt gói thư viện trong lib.txt
RUN pip install -r lib.txt

# container lắng nghe ở cổng 8000
EXPOSE 8000
# thư mục chứa dữ liệu bền vững - volume của container
VOLUME ["/data"]

# lệnh thực thi khi container chạy + đối số mặc định, kết quả thực thi: python main.py
ENTRYPOINT ["python"]
CMD ["main.py"]


# Tối ưu
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --only=production

CMD ["node", "dist/main"]

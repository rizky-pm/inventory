# -------------------------------------
# STAGE 1: BUILD VITE STATIC FILES
# -------------------------------------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    COPY package.json package-lock.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    # -------------------------------------
    # STAGE 2: SERVE USING NGINX
    # -------------------------------------
    FROM nginx:1.25-alpine
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Replace default nginx.conf
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    
# Menggunakan base image Nginx Alpine yang sangat ringan & cepat (~25MB)
FROM nginx:alpine

# Set metadata
LABEL maintainer="Petualangan Ceria TK-A"
LABEL description="Game Edukasi Interaktif Anak TK-A"

# Hapus file default bawaan Nginx
RUN rm -rf /usr/share/nginx/html/*

# Salin semua file game (HTML, CSS, JS) ke direktori web Nginx
COPY . /usr/share/nginx/html

# Port HTTP standar Nginx
EXPOSE 80

# Jalankan Nginx di foreground
CMD ["nginx", "-g", "daemon off;"]


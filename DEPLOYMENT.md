# EmbedPort Coming Soon - VPS Deployment Guide

## 🚀 Pre-Deployment Checklist

### ✅ Website Files Ready
- [x] `index.html` - Main page
- [x] `styles.css` - Styling
- [x] `script.js` - Functionality
- [x] All files are responsive and tested

### ✅ Design Improvements Made
- [x] Fixed text cropping issue on mobile devices
- [x] Improved responsive breakpoints
- [x] Enhanced typography scaling
- [x] Optimized for all screen sizes
- [x] Removed email form and notifications
- [x] Clean, minimal design

## 🌐 VPS Deployment Steps

### 1. Choose Your VPS Provider
**Recommended Options:**
- **DigitalOcean** - $5-10/month (Droplets)
- **Linode** - $5-10/month (Nanodes)
- **Vultr** - $5-10/month (Cloud Compute)
- **AWS EC2** - Pay as you go
- **Google Cloud** - Pay as you go

### 2. Server Setup

#### Option A: Simple Static Hosting
```bash
# Install Nginx
sudo apt update
sudo apt install nginx

# Create website directory
sudo mkdir -p /var/www/embedport
sudo chown -R $USER:$USER /var/www/embedport

# Upload your files
# (Upload index.html, styles.css, script.js to /var/www/embedport/)

# Configure Nginx
sudo nano /etc/nginx/sites-available/embedport
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/embedport;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/embedport /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Option B: Using Apache
```bash
# Install Apache
sudo apt update
sudo apt install apache2

# Create website directory
sudo mkdir -p /var/www/embedport
sudo chown -R $USER:$USER /var/www/embedport

# Upload your files
# (Upload index.html, styles.css, script.js to /var/www/embedport/)

# Configure Apache
sudo nano /etc/apache2/sites-available/embedport.conf
```

**Apache Configuration:**
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    ServerAlias www.your-domain.com
    DocumentRoot /var/www/embedport
    
    <Directory /var/www/embedport>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/embedport_error.log
    CustomLog ${APACHE_LOG_DIR}/embedport_access.log combined
</VirtualHost>
```

```bash
# Enable the site
sudo a2ensite embedport.conf
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### 3. Domain Configuration

#### DNS Setup
1. **Point your domain to your VPS IP:**
   ```
   Type: A
   Name: @
   Value: YOUR_VPS_IP_ADDRESS
   TTL: 300
   ```

2. **Add www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: your-domain.com
   TTL: 300
   ```

#### SSL Certificate (HTTPS)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# For Nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# For Apache
sudo apt install python3-certbot-apache
sudo certbot --apache -d your-domain.com -d www.your-domain.com
```

### 4. Performance Optimization

#### Enable Compression
**For Nginx (already in config above):**
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

**For Apache (.htaccess):**
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

#### Browser Caching
**For Nginx:**
```nginx
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**For Apache (.htaccess):**
```apache
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### 5. Security Setup

#### Firewall Configuration
```bash
# Install UFW
sudo apt install ufw

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

#### Security Headers (already in Nginx config above)
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

### 6. Monitoring & Maintenance

#### Set up monitoring
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Check server status
sudo systemctl status nginx  # or apache2
sudo systemctl status ufw
```

#### Regular maintenance
```bash
# Update system
sudo apt update && sudo apt upgrade

# Check logs
sudo tail -f /var/log/nginx/error.log  # or apache2/error.log
sudo tail -f /var/log/nginx/access.log # or apache2/access.log
```

## 📊 Performance Testing

### Test Your Deployment
1. **PageSpeed Insights**: https://pagespeed.web.dev/
2. **GTmetrix**: https://gtmetrix.com/
3. **WebPageTest**: https://www.webpagetest.org/

### Expected Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔧 Troubleshooting

### Common Issues
1. **403 Forbidden**: Check file permissions
2. **502 Bad Gateway**: Check web server status
3. **SSL Issues**: Verify certificate installation
4. **Slow Loading**: Check compression and caching

### Useful Commands
```bash
# Check web server status
sudo systemctl status nginx  # or apache2

# Check configuration
sudo nginx -t  # or apache2ctl configtest

# Restart services
sudo systemctl restart nginx  # or apache2

# Check logs
sudo tail -f /var/log/nginx/error.log
```

## 🎯 Final Checklist

### Before Going Live
- [ ] All files uploaded to server
- [ ] Domain DNS configured
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Performance tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked
- [ ] Monitoring set up
- [ ] Backup strategy in place

### Post-Deployment
- [ ] Test website on multiple devices
- [ ] Verify HTTPS redirects work
- [ ] Check loading speed
- [ ] Monitor server resources
- [ ] Set up automated backups
- [ ] Configure monitoring alerts

## 💡 Additional Tips

1. **Use a CDN** (Cloudflare, AWS CloudFront) for better global performance
2. **Set up automated backups** of your website files
3. **Monitor server resources** (CPU, RAM, disk space)
4. **Keep your system updated** regularly
5. **Document your setup** for future reference

Your EmbedPort coming soon page is now ready for production! 🚀 
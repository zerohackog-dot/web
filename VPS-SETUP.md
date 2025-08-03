# Quick VPS Setup Guide

## 🚀 Clone and Deploy EmbedPort Coming Soon

### Step 1: Connect to Your VPS
```bash
ssh root@YOUR_VPS_IP_ADDRESS
```

### Step 2: Update System and Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Git and Nginx
sudo apt install git nginx -y

# Install Node.js (optional, for future use)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 3: Clone the Repository
```bash
# Navigate to web directory
cd /var/www

# Clone the repository
sudo git clone https://github.com/zerohackog-dot/web.git embedport

# Set proper permissions
sudo chown -R $USER:$USER /var/www/embedport
sudo chmod -R 755 /var/www/embedport
```

### Step 4: Configure Nginx
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/embedport
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/embedport;
    index index.html;

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

    # Browser caching
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### Step 5: Enable the Site
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/embedport /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 6: Configure Firewall
```bash
# Install UFW
sudo apt install ufw -y

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### Step 7: Set Up Domain and SSL (Optional)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Step 8: Test Your Website
```bash
# Check if Nginx is running
sudo systemctl status nginx

# Check if site is accessible
curl -I http://localhost
```

## 🔄 Updating the Website

### Method 1: Manual Update
```bash
cd /var/www/embedport
sudo git pull origin main
sudo systemctl reload nginx
```

### Method 2: Automated Update (Recommended)
```bash
# Create update script
sudo nano /var/www/embedport/update.sh
```

**Add this to update.sh:**
```bash
#!/bin/bash
cd /var/www/embedport
git pull origin main
sudo systemctl reload nginx
echo "Website updated successfully!"
```

```bash
# Make script executable
sudo chmod +x /var/www/embedport/update.sh

# Run update
sudo /var/www/embedport/update.sh
```

## 📊 Monitoring

### Check Logs
```bash
# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Nginx access logs
sudo tail -f /var/log/nginx/access.log
```

### Check Performance
```bash
# Install monitoring tools
sudo apt install htop -y

# Monitor system resources
htop
```

## 🛠️ Troubleshooting

### Common Issues:

1. **403 Forbidden Error:**
```bash
sudo chown -R www-data:www-data /var/www/embedport
sudo chmod -R 755 /var/www/embedport
```

2. **Nginx Won't Start:**
```bash
sudo nginx -t
sudo systemctl status nginx
```

3. **Git Permission Issues:**
```bash
sudo chown -R $USER:$USER /var/www/embedport
```

## ✅ Final Checklist

- [ ] Repository cloned successfully
- [ ] Nginx configured and running
- [ ] Firewall configured
- [ ] Domain DNS pointing to VPS IP
- [ ] SSL certificate installed (if using domain)
- [ ] Website accessible via IP or domain
- [ ] Update script created and tested

## 🌐 Your Website URLs

- **IP Address**: http://YOUR_VPS_IP
- **Domain**: https://your-domain.com (after SSL setup)

Your EmbedPort coming soon page is now live on your VPS! 🚀 
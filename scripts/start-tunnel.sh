#!/bin/bash

# BotPe WhatsApp Webhook Tunnel Script
# Uses serveo.net to create a public tunnel to localhost:3000

PORT=3000

echo "=================================================="
echo "🌐 Starting Serveo.net Tunnel"
echo "=================================================="
echo ""
echo "Creating public tunnel to localhost:$PORT..."
echo ""
echo "⚠️  IMPORTANT:"
echo "   1. Copy the public URL that appears below"
echo "   2. Configure it in your BotPe webhook settings"
echo "   3. Your webhook URL will be: https://YOUR_URL/webhook"
echo ""
echo "=================================================="
echo ""

# Start serveo tunnel
# The -o StrictHostKeyChecking=no flag skips the SSH host key check
ssh -o StrictHostKeyChecking=no -R 80:localhost:$PORT serveo.net

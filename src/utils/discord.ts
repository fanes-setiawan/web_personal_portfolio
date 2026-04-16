import { NextRequest, userAgent } from 'next/server';

export interface VisitorInfo {
    page: string;
    ip?: string;
    userAgent?: string;
    browser?: string;
    os?: string;
    device?: string;
    location?: string;
    email?: string; // New field for logged-in user
    event?: 'PAGE_VIEW' | 'CV_DOWNLOAD';
}

/**
 * Fetches geolocation data from IP using ip-api.com (Free for non-commercial)
 */
/**
 * Fetches geolocation data from IP using ip-api.com (Free for non-commercial)
 */
async function getGeoLocation(ip: string): Promise<{ location: string, mapUrl: string }> {
    if (!ip || ip === '::1' || ip === '127.0.0.1' || ip === 'Unknown') return { location: 'Localhost', mapUrl: '' };
    
    try {
        console.log(`[Tracking] Fetching geo for IP: ${ip}`);
        // Add 3-second timeout to prevent hanging the middleware
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(`http://ip-api.com/json/${ip}`, { signal: controller.signal });
        clearTimeout(timeout);
        
        const data = await response.json();
        
        if (data.status === 'success') {
            const loc = `${data.city}, ${data.country}`;
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lon}`;
            return { location: loc, mapUrl: mapUrl };
        }
        return { location: 'Unknown Location', mapUrl: '' };
    } catch (error) {
        console.warn('[Tracking] Geo location fetch failed or timed out:', error);
        return { location: 'Unknown Location', mapUrl: '' };
    }
}

/**
 * Sends a notification to Discord via Webhook
 */
export async function sendDiscordNotification(info: VisitorInfo) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl || webhookUrl === 'your_discord_webhook_url_here') {
        console.warn('[Tracking] Discord Webhook URL not configured in Environment');
        return;
    }

    try {
        const geo = info.ip ? await getGeoLocation(info.ip) : { location: 'Unknown', mapUrl: '' };
        const isCV = info.event === 'CV_DOWNLOAD';
        const isAdmin = info.email && info.email.includes('admin'); // Simple admin check
        
        // Premium UI configuration
        const color = isAdmin ? 0xFF00FF : (isCV ? 0x00FF00 : 0x00A2FF);
        const title = isAdmin ? '👑 Admin Activity' : (isCV ? '📄 CV Downloaded!' : '👤 New Visitor');
        const authorIcon = isAdmin 
            ? 'https://cdn-icons-png.flaticon.com/512/6024/6024190.png' 
            : (isCV ? 'https://cdn-icons-png.flaticon.com/512/2991/2991108.png' : 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png');

        const embed = {
            author: { name: title, icon_url: authorIcon },
            color: color,
            description: `Pengunjung sedang melihat halaman **${info.page}**`,
            fields: [
                { name: '📧 Signed Email', value: info.email ? `\`${info.email}\`` : '👤 *Guest*', inline: true },
                { name: '📍 Location', value: geo.mapUrl ? `[${geo.location}](${geo.mapUrl})` : geo.location, inline: true },
                { name: '🌐 Browser', value: `\`${info.browser || 'Unknown'}\``, inline: true },
                { name: '📱 Device', value: `\`${info.device || 'Desktop'}\` (${info.os || 'Unknown'})`, inline: true },
                { name: '🔍 IP Address', value: `||${info.ip || 'Hidden'}||`, inline: true },
            ],
            footer: {
                text: 'Fanes Portfolio • Intelligence System',
                icon_url: 'https://cdn-icons-png.flaticon.com/512/2091/2091665.png'
            },
            timestamp: new Date().toISOString()
        };

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout for Discord

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] }),
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!response.ok) {
            console.error(`[Tracking] Discord responded with error: ${response.status} ${response.statusText}`);
        } else {
            console.log('[Tracking] Discord notification sent successfully');
        }
    } catch (error) {
        console.error('[Tracking] Failed to send Discord notification:', error);
    }
}

/**
 * Helper to extract visitor info from NextRequest
 */
export async function getVisitorInfo(req: NextRequest, event: VisitorInfo['event'] = 'PAGE_VIEW'): Promise<VisitorInfo> {
    const { device, browser, os } = userAgent(req);
    
    // Get IP (handling proxy headers)
    const ip = req.headers.get('cf-connecting-ip') || 
               req.headers.get('x-forwarded-for')?.split(',')[0] || 
               req.headers.get('x-real-ip') || 
               'Unknown';

    return {
        page: req.nextUrl.pathname,
        ip: ip,
        userAgent: req.headers.get('user-agent') || undefined,
        browser: `${browser.name || 'Unknown'} ${browser.version || ''}`.trim(),
        os: `${os.name || 'Unknown'} ${os.version || ''}`.trim(),
        device: device.type || 'Desktop',
        event: event
    };
}

import { NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1556129920156176505/rjsxJfwHc5D8vkoOiYLpVDI04jYbrsFK6OfRWxLp5TzuWUPRWl8anjICsvoJBW_ex42V";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Mengambil header untuk deteksi client
        const userAgent = req.headers.get('user-agent') || 'Unknown';
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown IP';
        const referer = req.headers.get('referer') || 'Direct/None';
        
        const embed = {
            title: "🔔 Visitor Log Detected",
            color: 5814783, // Light Blue
            fields: [
                { name: "Page URL", value: body.url || 'Unknown', inline: false },
                { name: "IP Address", value: ip, inline: true },
                { name: "Referrer", value: referer, inline: true },
                { name: "User Agent", value: userAgent, inline: false },
                { name: "Screen Size", value: body.screen || 'Unknown', inline: true },
                { name: "Language", value: body.language || 'Unknown', inline: true },
                { name: "Timezone", value: body.timezone || 'Unknown', inline: true },
            ],
            footer: {
                text: "Fanes Portfolio System"
            },
            timestamp: new Date().toISOString()
        };

        // Kirim ke webhook discord
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tracker API Error:", error);
        return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
    }
}

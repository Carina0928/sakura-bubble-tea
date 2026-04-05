import { NextResponse } from 'next/server';

const GITHUB_REPO = process.env.GITHUB_REPO || 'Carina0928/sakura-bubble-tea';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

export async function GET() {
  try {
    // Fetch sakura-config.json from GitHub repo
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/public/sakura-config.json`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
        // Don't cache - always get latest
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      // If file doesn't exist yet, return null so frontend uses defaults
      if (res.status === 404) {
        return NextResponse.json({ config: null });
      }
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    // GitHub returns content as base64
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const config = JSON.parse(content);

    return NextResponse.json({ config });
  } catch (error) {
    console.error('Failed to fetch config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch config' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

const GITHUB_REPO = process.env.GITHUB_REPO || 'Carina0928/sakura-bubble-tea';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sakura2024';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, config } = body;

    // Verify admin password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!config) {
      return NextResponse.json(
        { error: 'No config provided' },
        { status: 400 }
      );
    }

    // First, try to get the existing file to get its SHA (needed for updates)
    const existingRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/public/sakura-config.json`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    let sha: string | undefined;
    if (existingRes.ok) {
      const existingData = await existingRes.json();
      sha = existingData.sha;
    }

    // Convert config to base64
    const content = Buffer.from(
      JSON.stringify(config, null, 2),
      'utf-8'
    ).toString('base64');

    // Create or update the file via GitHub API
    const updateRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/public/sakura-config.json`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Update config via admin dashboard - ${new Date().toISOString()}`,
          content,
          ...(sha ? { sha } : {}),
          branch: 'main',
        }),
      }
    );

    if (!updateRes.ok) {
      const errorData = await updateRes.json();
      console.error('GitHub API update error:', errorData);
      throw new Error(`GitHub API error: ${updateRes.status}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Config updated! Site will redeploy in ~30-60 seconds.',
    });
  } catch (error) {
    console.error('Failed to update config:', error);
    return NextResponse.json(
      { error: 'Failed to update config' },
      { status: 500 }
    );
  }
}

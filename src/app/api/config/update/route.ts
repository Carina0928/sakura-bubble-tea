import { NextRequest, NextResponse } from 'next/server';

const GITHUB_REPO = process.env.GITHUB_REPO || 'Carina0928/sakura-bubble-tea';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sakura2024';

// Helper: get file SHA from GitHub (needed for updates)
async function getFileSha(filePath: string): Promise<string | undefined> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      return data.sha;
    }
  } catch {}
  return undefined;
}

// Helper: update or create a file on GitHub
async function updateGitHubFile(filePath: string, content: string, message: string) {
  const sha = await getFileSha(filePath);
  const base64Content = Buffer.from(content, 'utf-8').toString('base64');

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        content: base64Content,
        ...(sha ? { sha } : {}),
        branch: 'main',
      }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.error(`GitHub API error for ${filePath}:`, errorData);
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return res.json();
}

// Generate siteConfig.ts content from admin config
function generateSiteConfigTS(config: any): string {
  // Filter out base64 image data and productImages to keep file size small
  const cleanConfig = { ...config };
  
  // Remove productImages (too large for siteConfig)
  delete cleanConfig.productImages;
  
  // Remove any base64 data URLs (replace with empty string)
  for (const key of Object.keys(cleanConfig)) {
    if (typeof cleanConfig[key] === 'string' && cleanConfig[key].startsWith('data:')) {
      delete cleanConfig[key]; // Skip base64 images
    }
  }

  // Ensure these fields always exist (admin panel may not manage them all)
  const defaults: Record<string, string> = {
    accentColor: '#ffc2d4',
    aboutBg: 'linear-gradient(180deg, #fff5f8 0%, #ffe8f0 100%)',
    aboutBgColor: '#fff5f8',
    aboutQuote: 'Când cineva cumpără de la Sakura Bubble Tea, nu cumpără doar o băutură. Cumpără un moment de bucurie.',
    aboutCta: '„Vino să descoperi gustul autentic."',
    aboutP3: 'Fiecare produs este creat cu precizie — de la selecția ceaiului, la textura perfectă a perlelor de tapioca și echilibrul fin al aromelor.',
    aboutBrandSlogan: 'Nu vindem doar băuturi. Creăm experiențe premium.',
    productsBg: 'linear-gradient(180deg, #fff5f8 0%, #ffe8f0 100%)',
    contactBg: 'linear-gradient(180deg, #fff5f8 0%, #ffe8f0 100%)',
    contactBgColor: '#fff5f8',
    featuresBg: 'linear-gradient(150deg, #ffffff 0%, #ffe0ec 30%, #f90b5a 100%)',
    featuresTextColor: '#ffffff',
    navbarBtnRadius: '9999px',
  };
  
  // Merge: admin values override defaults
  const merged = { ...defaults, ...cleanConfig };

  const lines: string[] = [];
  lines.push('// ═══════════════════════════════════════════════════════════════');
  lines.push('// SITE CONFIG — auto-updated by admin panel');
  lines.push(`// Last updated: ${new Date().toISOString()}`);
  lines.push('// ═══════════════════════════════════════════════════════════════');
  lines.push('');
  lines.push('export const SITE_CONFIG = {');

  // Group keys by section
  const sections: Record<string, string[]> = {
    'Global Colors': ['primaryColor', 'secondaryColor', 'accentColor', 'bgColor'],
    'Fonts': ['fontHeading', 'fontBody'],
    'Navbar': ['navbarBg', 'navbarTextColor', 'navbarLogoSize', 'navbarBtnRadius'],
    'Hero': ['heroTitle', 'heroSubtitle', 'heroTagline', 'heroDescription', 'heroBg', 'heroBgType', 'heroBgImage', 'heroTitleColor', 'heroTextColor', 'heroBtnColor', 'heroBtnTextColor', 'heroBtnRadius'],
    'Stats': ['stat1Value', 'stat1Label', 'stat2Value', 'stat2Label', 'stat3Value', 'stat3Label'],
    'Circles': ['mainCircleImage', 'smallCircle1Image', 'smallCircle1Label', 'smallCircle2Image', 'smallCircle2Label', 'smallCircle3Image', 'smallCircle3Label'],
    'About': ['aboutTitle', 'aboutSubtitle', 'aboutImage', 'aboutBg', 'aboutTextColor', 'aboutFoundedYear', 'aboutP1', 'aboutQuote', 'aboutCta', 'aboutP2', 'aboutP3', 'aboutBrandSlogan'],
    'Products Page': ['productsTitle', 'productsSubtitle', 'productsBg', 'productsCardBg', 'productsCardBorder'],
    'Contact': ['contactTitle', 'contactSubtitle', 'contactBg', 'contactBgColor', 'contactEmail', 'contactAddress', 'contactHours'],
    'Footer': ['footerBg', 'footerTextColor', 'footerTagline'],
    'CTA Section': ['ctaTitle', 'ctaDesc', 'ctaBg', 'ctaTextColor'],
    'Features Section': ['featuresBg', 'featuresTextColor'],
  };

  const usedKeys = new Set<string>();

  for (const [sectionName, keys] of Object.entries(sections)) {
    lines.push(`    // — ${sectionName} ${'─'.repeat(Math.max(0, 50 - sectionName.length))}`);
    for (const key of keys) {
      if (key in merged) {
        const val = merged[key];
        if (typeof val === 'number') {
          lines.push(`    ${key}: ${val},`);
        } else {
          // Escape for single-quoted JS string: only escape actual single quotes and newlines
          const str = String(val)
          const escaped = str.split("'").join("\\'").split('\n').join('\\n')
          lines.push(`    ${key}: '${escaped}',`);
        }
        usedKeys.add(key);
      }
    }
  }

  // Add any remaining keys not in sections
  const remainingKeys = Object.keys(merged).filter(k => !usedKeys.has(k));
  if (remainingKeys.length > 0) {
    lines.push('    // — Other ──────────────────────────────────────────');
    for (const key of remainingKeys) {
      const val = merged[key];
      if (typeof val === 'number') {
        lines.push(`    ${key}: ${val},`);
      } else if (typeof val === 'string') {
        const escaped = String(val).split("'").join("\\'").split('\n').join('\\n');
        lines.push(`    ${key}: '${escaped}',`);
      }
    }
  }

  lines.push('} as const');
  lines.push('');
  lines.push('export type SiteConfig = typeof SITE_CONFIG');
  lines.push('');

  return lines.join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, config } = body;

    // Verify admin password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!config) {
      return NextResponse.json({ error: 'No config provided' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    // 1. Update public/sakura-config.json (backup)
    await updateGitHubFile(
      'public/sakura-config.json',
      JSON.stringify(config, null, 2),
      `Update config JSON via admin - ${timestamp}`
    );

    // 2. Update src/lib/siteConfig.ts (this is what the site actually uses)
    const siteConfigContent = generateSiteConfigTS(config);
    await updateGitHubFile(
      'src/lib/siteConfig.ts',
      siteConfigContent,
      `Update siteConfig.ts via admin - ${timestamp}`
    );

    return NextResponse.json({
      success: true,
      message: 'Config updated! Site will redeploy in ~30-60 seconds.',
    });
  } catch (error: any) {
    console.error('Failed to update config:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update config' },
      { status: 500 }
    );
  }
}

const PETITION_URL =
  'https://www.change.org/p/support-brian-zater-s-sentence-reduction-a-case-for-redemption-and-rehabilitation';

const COUNT_REGEX = /"signatureCount":\{"total":(\d+)/;
const GOAL_REGEX = /"signatureGoal":\{"displayed":(\d+)/;

const FALLBACK = {
  count: 124,
  goal: 200,
  percentComplete: 62,
  fallback: true
};

export async function onRequestGet() {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=86400, s-maxage=86400'
  };

  try {
    const res = await fetch(PETITION_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; PetitionCount/1.0; +https://brianzater.com)'
      }
    });

    if (!res.ok) {
      throw new Error('Fetch failed');
    }

    const html = await res.text();

    const countMatch = html.match(COUNT_REGEX);
    const goalMatch = html.match(GOAL_REGEX);

    const count = countMatch ? parseInt(countMatch[1], 10) : null;
    const goal = goalMatch ? parseInt(goalMatch[1], 10) : null;

    if (count == null || goal == null || goal === 0) {
      return new Response(JSON.stringify(FALLBACK), { headers });
    }

    const percentComplete = Math.round((count / goal) * 100);
    const lastUpdated = new Date().toISOString();

    return new Response(
      JSON.stringify({ count, goal, percentComplete, lastUpdated }),
      { headers }
    );
  } catch {
    return new Response(JSON.stringify(FALLBACK), { headers });
  }
}
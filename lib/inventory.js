// Eenvoudige inventory-laag:
// - Productie: Upstash Redis REST (aanbevolen; persistent, gratis tier)
// - Lokaal/dev: in-memory fallback (reset bij herstart)

const USE_UPSTASH =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

let memory = {
  early_sold: 0
};

async function upstashGet(key) {
  const url = `${process.env.UPSTASH_REDIS_REST_URL}/get/${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
    cache: 'no-store'
  });
  const json = await res.json();
  if (json.result == null) return null;
  const n = Number(json.result);
  return Number.isFinite(n) ? n : null;
}

async function upstashSet(key, value) {
  const url = `${process.env.UPSTASH_REDIS_REST_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(
    String(value)
  )}`;
  await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
    method: 'POST',
    cache: 'no-store'
  });
}

async function upstashIncr(key, by = 1) {
  const url = `${process.env.UPSTASH_REDIS_REST_URL}/incrby/${encodeURIComponent(key)}/${by}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
    method: 'POST',
    cache: 'no-store'
  });
  const json = await res.json();
  return Number(json.result || 0);
}

export async function getEarlySold() {
  if (USE_UPSTASH) {
    const v = await upstashGet('early_sold');
    return v ?? 0;
  }
  return memory.early_sold || 0;
}

export async function setEarlySold(n) {
  if (USE_UPSTASH) {
    await upstashSet('early_sold', n);
    return;
  }
  memory.early_sold = n;
}

export async function incrEarlySold(by = 1) {
  if (USE_UPSTASH) {
    return await upstashIncr('early_sold', by);
  }
  memory.early_sold = (memory.early_sold || 0) + by;
  return memory.early_sold;
}
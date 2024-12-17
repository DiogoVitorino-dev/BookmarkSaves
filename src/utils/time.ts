const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms));

type RetryCallback = () => boolean | Promise<boolean>;

async function retry(callback: RetryCallback, retries = 3, delay = 1000) {
  let finished = false;

  if (retries <= -1) {
    retries = Number.MAX_SAFE_INTEGER;
  }

  finished = await callback();

  if (!finished || retries <= 0) {
    await sleep(delay);
    retry(callback, retries - 1);
  }
}

export const TimeUtils = {
  sleep,
  retry,
};

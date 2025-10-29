const keys = { w:false, a:false, s:false, d:false, space:false, e:false };
const onDown = (e: KeyboardEvent) => {
  const k = e.key.toLowerCase();
  if (k in keys) (keys as any)[k] = true;
  if (e.code === 'Space') keys.space = true;
};
const onUp = (e: KeyboardEvent) => {
  const k = e.key.toLowerCase();
  if (k in keys) (keys as any)[k] = false;
  if (e.code === 'Space') keys.space = false;
};

export { keys, onDown, onUp };

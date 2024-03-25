export function getRandomID(length = 10) {
  const characterPool =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let ret = characterPool.charAt(
    Math.floor(Math.random() * (characterPool.length - 11)),
  );

  [...Array(length)].forEach((_) => {
    ret += characterPool.charAt(
      Math.floor(Math.random() * characterPool.length),
    );
  });

  return ret;
}

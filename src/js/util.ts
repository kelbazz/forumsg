async function replaceAsync(str: string, regex: RegExp, asyncFn: Function) {
  const promises: Promise<string>[] = [];
  //@ts-ignore
  str.replace(regex, (match: string, ...args: any[]) => {
      const promise = asyncFn(match, ...args);
      promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift() || "");
}

export {
  replaceAsync
}
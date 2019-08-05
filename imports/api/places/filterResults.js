const isNotBlacklisted = (result, blacklist) => {
  // TODO more sophisticated filtering if time
  const { name } = result;
  return !blacklist.includes(name);
};

export default (results, minimumRating, blacklist) => (
  results.filter(result => (
    minimumRating <= result.rating && isNotBlacklisted(result, blacklist)
  ))
);

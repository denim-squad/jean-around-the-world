import levenshtein from 'js-levenshtein';

const isNotBlacklisted = (result, blacklist) => blacklist.every((blacklistItem) => {
  const { name } = result;
  const lowerCaseBlacklist = blacklistItem.toLowerCase();
  const lowerCaseResultName = name.toLowerCase();

  return !lowerCaseBlacklist.includes(lowerCaseResultName) && levenshtein(lowerCaseBlacklist, lowerCaseResultName) > 3;
});

const isInBudgetRange = (result, budgetRange) => (
  budgetRange[0] <= result.price_level && result.price_level <= budgetRange[1]
);

export default (results, budgetRange, minimumRating, blacklist) => results.filter(result => (
  minimumRating <= result.rating
    && isInBudgetRange(result, budgetRange)
    && isNotBlacklisted(result, blacklist)
));

/** 
 * 需先引用 lodash.js - https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.min.js
 *
 * 字串模糊比對
   - Javascript fuzzy search that makes sense - Stack Overflow - https://goo.gl/GHQacY
     (範例) http://jsfiddle.net/arphen/fq583Lvs/
 *
 * ref:
 * javascript compare two string fuzzy - Google 搜尋 - https://goo.gl/LxhKQm
 */

var FUZZY = {};

FUZZY.getBigrams = function (string) {
  var i, j, ref, s, v;
  s = string.toLowerCase();
  v = new Array(s.length - 1);
  for (i = j = 0, ref = v.length; j <= ref; i = j += 1) {
    v[i] = s.slice(i, i + 2);
  }
  return v;
};

FUZZY.stringSimilarity = function (str1, str2) {
  var hitCount, j, k, len, len1, pairs1, pairs2, union, x, y;
  if (str1.length > 0 && str2.length > 0) {
    pairs1 = FUZZY.getBigrams(str1);
    pairs2 = FUZZY.getBigrams(str2);
    union = pairs1.length + pairs2.length;
    hitCount = 0;
    for (j = 0, len = pairs1.length; j < len; j++) {
      x = pairs1[j];
      for (k = 0, len1 = pairs2.length; k < len1; k++) {
        y = pairs2[k];
        if (x === y) {
          hitCount++;
        }
      }
    }
    if (hitCount > 0) {
      return (2.0 * hitCount) / union;
    }
  }
  return 0.0;
};

/**
 * 
 * @param {string} query 
 * @param {array of string} strings 
 * @returns {array of object}
 * query = 'jenny Jackson';
 * strings = ['John Jackson', 'Jack Johnson', 'Jerry Smith', 'Jenny Smith'];
 * retults = {
    {string, relevance},
    {string, relevance}, 
    {string, relevance}, 
    {string, relevance}
   }
 */
FUZZY.compareString = function (query, strings) {

  var i, len, str, obj, relevance, results;

  // query = 'jenny Jackson';
  // strings = ['John Jackson', 'Jack Johnson', 'Jerry Smith', 'Jenny Smith'];

  results = [];

  for (i = 0, len = strings.length; i < len; i++) {
    str = strings[i];
    relevance = FUZZY.stringSimilarity(query, str);
    obj = {
      arrayIndex: i,
      string: str,
      relevance: relevance
    };
    results.push(obj);
  }

  // relevance 由最高排到最低
  //results = _.first(_.sortBy(results, 'relevance').reverse(), 10);
  results = _.sortBy(results, 'relevance')
    .reverse();

  return results;
};

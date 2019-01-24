function getUrlParam(sUrl, sKey) {
  var searchStr = sUrl.split('?')[1].split('#')[0]
  var searchStrArr = searchStr.split('&')

  var obj = {}

  searchStrArr.forEach(function(e) {
    var entry = e.split('=')
    var key = entry[0]
    var value = entry[1] || ''

    if (obj[key]) {
      if (typeof obj[key] === 'object') {
        obj[key].push(value)
      } else {
        obj[key] = [obj[key], value]
      }
    } else obj[key] = value
  })

  if (!sKey) return obj

  return obj[sKey] || ''
}

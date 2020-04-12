'use strict'
const fetch = require('node-fetch')
const path = require('path')

const collect = async (ids, options) => {
  options = options || require(path.join(__dirname, '/hosting.json'))
  const serviceList = Object.keys(options)
  const res = {}

  for (const id of ids) {
    const bundled = id.split(':')
    // specify with service
    if (bundled.length === 2) res[id] = await requestAPI(bundled[1], options[bundled[0]])
    // not specify service
    else {
      for (const service of serviceList) {
        if (options[service].default) res[`${service}:${id}`] = await requestAPI(id, options[service])
      }
    }
  }
  return res
}

const requestAPI = async (id, service) => {
  const ep = service.api.replace(/{id}/gi, id)
  return fetch(ep).then(res => res.json())
}

// parse for authorized_keys format
const parseRaw = (jsonResponse) => {
  let raw = ''
  const serviceList = Object.keys(jsonResponse)
  serviceList.forEach(service => {
    raw += `\n# ${service}\n`
    if (!Array.isArray(jsonResponse[service])) raw += '# Error: cound not get\n'
    else {
      jsonResponse[service].forEach(elm => {
        raw += `${elm.key}\n`
      })
    }
  })
  return raw
}

module.exports = { collect, parseRaw }

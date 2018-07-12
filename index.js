var utils = require('shipit-utils')
module.exports = function (shipit) {
  shipit = utils.getShipit(shipit)
  shipit.on('fetched', function () {
    shipit.config = shipit.config || {}
    shipit.config.cnpm = shipit.config.cnpm || {}
    shipit.config.cnpm.flags = shipit.config.cnpm.flags || ''
    shipit.config.cnpm.npm = shipit.config.cnpm.npm || 'cnpm'
    shipit.config.cnpm.params = shipit.config.cnpm.params || ''
    require('./tasks/compare')(shipit)
    require('./tasks/install')(shipit)
    if (shipit.config.cnpm.remote == true) {
      shipit.on('published', function () {
        if (shipit.config.cnpm.compare == true) {
          shipit.start('cnpm:compare')
        } else {
          shipit.start('cnpm:install')
        }
      })
    } else {
      shipit.start('cnpm:install')
    }
  })
}

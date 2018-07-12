var path = require('path')
var utils = require('shipit-utils')
var util = require('util')

module.exports = function (shipit) {
  utils.registerTask(shipit, 'cnpm:compare', task)
  function task () {
    if (!shipit.config.deployTo) {
      throw new Error('You need to config deployTo');
    }

    return remoteCopy()
      .then(remoteRunCompare)
      .then(function () {
        shipit.log('Shipit can do a lot more than you think.');
      });

    function remoteRunCompare () {
      var option = shipit.config.cnpm || {}
      var npm = option.npm ? option.npm : 'npm'
      var cli = option.cli ? option.cli : 'install'
      var flags = option.flags ? option.flags : '--production'
      var file = path.join(shipit.config.deployTo, 'current')
      shipit.log('Start running ' + file + '/compare.sh.')
      return shipit.remote(
        'sh ' + file + '/compare.sh ' + shipit.config.deployTo + ' ' + file + ' ' + npm + ' ' + cli + ' ' + flags
      ).then((res) => {
        shipit.log('Finished running ' + file + '/compare.sh.')
      }).catch(error => {
        console.error(error.stderr)
      })
    }

    function remoteCopy () {
      var uploadDirPath = process.cwd() + '/node_modules/shipit-better-cnpm/tasks/compare.sh'
      var releasePath = path.join(shipit.config.deployTo, 'current')

      shipit.log('Start copy compare.sh to remote servers(' + shipit.config.servers + ').');

      return shipit.remoteCopy(uploadDirPath, releasePath).then(function () {
        shipit.log('Finished copy compare.sh.');
      });
    }
  }
}

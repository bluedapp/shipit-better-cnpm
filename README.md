# shipit-better-cnpm

Fork from [bluedapp/shipit-cnpm](https://github.com/bluedapp/shipit-cnpm)

cnpm tasks for shipit

## Install

```bash
npm i -D shipit-better-cnpm
```

## How to use

```javascript
var cnpm = require('shipit-better-cnpm')
var deploy = require('shipit-better-deploy')
module.exports = function(shipit) {
  deploy(shipit)
  cnpm(shipit)
  shipit.initConfig({
    default: {
      workspace: '/tmp/deploy/cnpm-test',
      deployTo: '/home/work/cnpm-test',
      repositoryUrl: 'https://xx.git',
      ignores: ['.git'],
      keepReleases: 2,
      deleteOnRollback: false,
      shallowClone: true,
      cnpm: {
        compare: true,
        flags: '--production',
        local: false,
        npm: 'cnpm',
        remote: true
      }
    },
    production: {
      servers: ['work@10.x.x.x']
    },
    dev: {
      servers: ['work@10.x.x.x']
    }
  })
}
```

### Tips

If you have used `shipit-cnpm` before, you need run `npm install` in the `deploy:publish`. now, only `package.json` file different.

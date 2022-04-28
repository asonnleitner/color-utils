// create package.json, README, etc. for packages that don't have them yet

const fs = require('fs')
const path = require('path')
const version = require('../package.json').version

const force = process.argv.includes('--force')

const packagesDir = path.resolve(__dirname, '../packages')
const files = fs.readdirSync(packagesDir)

files.forEach((shortName) => {
  if (!fs.statSync(path.join(packagesDir, shortName)).isDirectory()) return

  const name =
    shortName === `color-utils` ? shortName : `@color-utils/${shortName}`
  const pkgPath = path.join(packagesDir, shortName, `package.json`)
  const pkgExists = fs.existsSync(pkgPath)

  if (pkgExists) {
    const pkg = require(pkgPath)
    if (pkg.private) return
  }

  if (force || !pkgExists) {
    const json = {
      name,
      version,
      description: name,
      main: 'index.js',
      files: [`index.js`, `dist`],
      types: `dist/${shortName}.d.ts`,
      repository: {
        type: 'git',
        url: 'git+https://github.com/asonnleitner/color-utils.git'
      },
      license: 'MIT',
      bugs: {
        url: 'https://github.com/asonnleitner/color-utils/issues'
      },
      homepage: `https://github.com/asonnleitner/color-utils/tree/dev/packages/${shortName}#readme`
    }

    fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2))
  }

  const readmePath = path.join(packagesDir, shortName, `README.md`)
  if (force || !fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, `# ${name}`)
  }

  const srcDir = path.join(packagesDir, shortName, `src`)
  const indexPath = path.join(packagesDir, shortName, `src/index.ts`)
  if (force || !fs.existsSync(indexPath)) {
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir)
    }
    fs.writeFileSync(indexPath, ``)
  }
})

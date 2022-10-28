import { addAlias } from 'module-alias'

addAlias('@', __dirname)

require('./app')


/**
 * @author yangxinlong
 * 
 * modelName
 * 需要生成的文件及文件夹
 * src/views/modelName文件夹
 * src/views/modelName/index.vue
 * src/views/modelName/list.vue
 * src/views/modelName/profile.vue
 * src/store/modules/modelName.js
 * src/api/modelName.js
 */

const fs = require('fs')
const modelName = process.argv.splice(2)[0]
const filePath = (modelName) => {
  return {
    dir: `/src/views/${modelName}`,
    index_vue: `/src/views/${modelName}/index.vue`,
    list_vue: `/src/views/${modelName}/list.vue`,
    profile_vue: `/src/views/${modelName}/profile.vue`,
    module_js: `/src/store/modules/${modelName}.js`,
    api_js: `/src/api/${modelName}.js`
  }
}
const tmpPath = {
  index_vue: `/src/views/tmp/index.vue`,
  list_vue: `/src/views/tmp/list.vue`,
  profile_vue: `/src/views/tmp/profile.vue`,
  module_js: `/src/store/modules/tmp.js`,
  api_js: `/src/api/tmp.js`
}
const mkFile = (readPath, writePath, modelName) => {
  fs.readFile(__dirname + readPath, (err, file) => {
    let result = file.toString()
      .replace(/tmp/g, modelName)
      .replace(/custom/g, modelName)
      .replace(/Tmp/g, modelName.slice(0, 1).toUpperCase() + modelName.slice(1))
      .replace(/TMP/g, modelName.toUpperCase())
    fs.writeFile(__dirname + writePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
      console.log('success!', 'writePath', writePath)
    })
  })
}
/**
 * 在指定位置前插入新的字符串
 * @param {string} result --需要修改的字符串
 * @param {string} impStr --插入的字符串
 * @param {Number} sn --插入位置
 */
function insert_str_head(result, impStr, index) {
  // 查找'const service'的位置
  // let index = result.indexOf(sn)
  let len = result.length
  // 截取index左边的字符串
  let chartL = result.substring(0,index-1)
  // 截取index右边的字符串
  let chartR = result.substring(index-1,len)
  // 拼接
  let str = chartL + impStr + chartR

  return str
}

const insertFile = (modelName) => {
  let apiPath = __dirname + '/src/api/index.js'
  let modulePath = __dirname + '/src/store/index.js'
  let typePath = __dirname + '/src/store/modules/mutation-types.js'

  // 设置api index
  fs.readFile(apiPath, (err, file) => {
    let result = file.toString()
    // 需要插入的字符串
    let impStr = `import * as ${modelName} from './${modelName}'\n`
    // 查找'const service'的位置
    let index = result.indexOf('const service')
    // 拼接
    let str = insert_str_head(result,impStr,index)

    let index2 = str.indexOf('}')
    let str2 = insert_str_head(str,`\n  ...${modelName},`,index2)
    fs.writeFile(apiPath, str2, 'utf8', function (err) {
      if (err) return console.log(err)
      console.log('apiPath success!', 'writePath', apiPath)
    })
  })

  // 设置module index
  fs.readFile(modulePath, (err, file) => {
    let result = file.toString()
    // 需要插入的字符串
    let impStr = `\nimport ${modelName} from './modules/${modelName}'`
    // 查找'const service'的位置
    let index = result.indexOf(`import tmp from './modules/tmp'`)
    // 拼接
    let str = insert_str_head(result,impStr,index)

    let index2 = str.indexOf('  },')
    let str2 = insert_str_head(str,`\n    ${modelName},`,index2)
    fs.writeFile(modulePath, str2, 'utf8', function (err) {
      if (err) return console.log(err)
      console.log('modulePath success!', 'modulePath', modulePath)
    })
  })

  // 设置mutation-types.js
  fs.readFile(typePath, (err, file) => {
    let result = file.toString()+
                `\n//${modelName}.js\n`+
                `export const SET_${modelName.toUpperCase()}_LIST = "SET_${modelName.toUpperCase()}_LIST"\n`
    fs.writeFile(typePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
      console.log('typePath success!', 'writePath', typePath)
    })
  })
}

// const pj = (type, fileName) => path.join(__dirname, `app/${type}`, fileName)

console.log(modelName)

fs.mkdir(__dirname + `/src/views/${modelName}`, function (err) {
  if (err) throw (err)
  for (let key in filePath(modelName)) {
    if (key !== 'dir') {
      mkFile(tmpPath[key], filePath(modelName)[key], modelName)
    }
  }
  insertFile(modelName)
})

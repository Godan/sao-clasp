import path from 'path'
import test from 'ava'
import sao from 'sao'

const generator = path.join(__dirname, '..')

test('defaults', async t => {
  const stream = await sao.mock({ generator })
  t.true(stream.fileList.includes('src/index.ts'))
})

// check generate index.ts and check not generate index.js
test('typeScript', async t => {
  const mockPromptAnswers = { language: 'ts' }
  const stream = await sao.mock({ generator }, mockPromptAnswers)

  t.true(stream.fileList.includes('src/index.ts'))
  t.false(stream.fileList.includes('src/index.js'))

  // json syntax check
  stream.readFile('package.json').then(text => {
    t.notThrows(() => JSON.parse(text))
  })
})

// check generate index.js and check not generate index.ts
test('JavaScript(Legacy)', async t => {
  const mockPromptAnswers = { language: 'js' }
  const stream = await sao.mock({ generator }, mockPromptAnswers)

  t.true(stream.fileList.includes('src/index.js'))
  t.false(stream.fileList.includes('src/index.ts'))

  // json syntax check
  stream.readFile('package.json').then(text => {
    t.notThrows(() => JSON.parse(text))
  })
})

// check syntax pacage.json, if not use jest option 
test('not use jest', async t => {
  const mockPromptAnswers = { language: 'ts', jest: false }
  const stream = await sao.mock({ generator }, mockPromptAnswers)

  t.true(stream.fileList.includes('package.json'))
  // json syntax check
  stream.readFile('package.json').then(text => {
    t.notThrows(() => JSON.parse(text))
  })
})

// check syntax pacage.json, if not use lint option
test('not use lint', async t => {
  const mockPromptAnswers = { language: 'ts', lint: false }
  const stream = await sao.mock({ generator }, mockPromptAnswers)

  t.true(stream.fileList.includes('package.json'))
  // json syntax check
  stream.readFile('package.json').then(text => {
    t.notThrows(() => JSON.parse(text))
  })
})
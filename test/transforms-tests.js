import { snakeCase } from 'lodash'
import test from 'blue-tape'

import { transforms } from '../src'

const fields = [
  'id'
, 'moreThanOneWord'
]

const { instanceToItem, itemToInstance } =
  transforms.createPersistenceTransforms(fields, snakeCase)

test('It can turn an item into an instance', t => {
  const item = {
    id: 'id'
  , more_than_one_word: 'more_than_one_word'
  , not_in_schema: 'not_in_schema'
  }

  const instance = itemToInstance(item)

  t.equal(
    instance.moreThanOneWord
  , item.more_than_one_word
  , 'It did the conversion'
  )
  t.notOk(instance.more_than_one_word, 'Did not leave old casing')
  t.notOk(instance.notInSchema, 'Did not convert field not in schema')
  t.notOk(instance.not_in_schema, 'Did not leave old casing')

  t.end()
})

test('It can turn an instance into an item', t => {
  const instance = {
    id: 'id'
  , moreThanOneWord: 'moreThanOneWord'
  , notInSchema: 'notInSchema'
  }

  const item = instanceToItem(instance)

  t.equal(
    item.more_than_one_word
  , instance.moreThanOneWord
  , 'It did the conversion'
  )
  t.notOk(item.moreThanOneWord, 'Did not leave old casing')
  t.notOk(item.not_in_schema, 'Did not convert field not in schema')
  t.notOk(item.notInSchema, 'Did not leave old casing')

  t.end()
})

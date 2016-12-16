export function createPersistenceTransforms(fields, fieldNameToItemFieldName) {
  function instanceToItem(instance) {
    if (!instance) return null

    return fields.reduce(
      (item, field) => {
        // eslint-disable-next-line no-param-reassign
        item[fieldNameToItemFieldName(field)] = instance[field]

        return item
      }
    , { }
    )
  }

  function itemToInstance(item) {
    if (!item) return null

    return fields.reduce(
      (instance, field) => {
        // eslint-disable-next-line no-param-reassign
        instance[field] = item[fieldNameToItemFieldName(field)]

        return instance
      }
    , { }
    )
  }

  return { instanceToItem, itemToInstance }
}

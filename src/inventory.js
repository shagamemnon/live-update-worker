export default {
  items: {
    shoes: '0',
    shirts: '0',
    hats: '0'
  },

  async update (elem) {
    const getProducts = Object.keys(this.items).map(async productName => {
      let value = await INVENTORY.get(productName)
      this.items[productName] = value
    })

    for (const product of getProducts) {
      await product
    }
    return this.items
  }
}

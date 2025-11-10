const UserMother = require('./UserMother')

class CarrinhoBuilder {
  constructor() {
    this._user = UserMother.umUsuarioPadrao()
    this._itens = [
      { id: 'livro123', nome: 'Jane Eyre - Capa Dura', preco: 100.0, quantidade: 1 }
    ]
  }

  comUser(user) {
    this._user = user
    return this
  }

  comItens(itens) {
    this._itens = itens
    return this
  }

  vazio() {
    this._itens = []
    return this
  }

  _calculaTotal() {
    return this._itens.reduce(
      (total, item) => total + item.preco * (item.quantidade || 1),
      0
    )
  }

  build() {
    return {
      user: this._user,
      itens: this._itens,
      total: this._calculaTotal()
    }
  }
}

module.exports = CarrinhoBuilder

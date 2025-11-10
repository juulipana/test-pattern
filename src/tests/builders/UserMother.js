class UserMother {
  static umUsuarioPadrao() {
    return {
      id: 'user-1',
      nome: 'Juliana Cunha',
      email: 'ju@teste.com',
      tipo: 'NORMAL'
    }
  }

  static umUsuarioPremium() {
    return {
      id: 'user-2',
      nome: 'Fernanda Parreiras',
      email: 'fernanda@email.com',
      tipo: 'PREMIUM'
    }
  }
}

module.exports = UserMother

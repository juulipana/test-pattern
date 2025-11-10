const CarrinhoBuilder = require('./builders/CarrinhoBuilder')
const UserMother = require('./mothers/UserMother')
const CheckoutService = require('../src/services/CheckoutService')

describe('CheckoutService', () => {
  describe('quando um cliente Premium finaliza a compra', () => {
    test('deve aplicar desconto, cobrar o valor correto e enviar e-mail de confirmação', async () => {
      const usuarioPremium = UserMother.premium()
      const carrinho = new CarrinhoBuilder()
        .comUsuario(usuarioPremium)
        .comTotal(200)
        .build()

      const gatewayStub = {
        cobrar: jest.fn().mockResolvedValue({ success: true })
      }

      const pedidoSalvo = { id: 1, total: 180, usuario: usuarioPremium }
      const pedidoRepositoryStub = {
        salvar: jest.fn().mockResolvedValue(pedidoSalvo)
      }

      const emailMock = {
        enviarEmail: jest.fn()
      }

      const checkoutService = new CheckoutService(
        gatewayStub,
        pedidoRepositoryStub,
        emailMock
      )

      const pedido = await checkoutService.processarPedido(carrinho)

      expect(pedido).toEqual(pedidoSalvo)

      expect(gatewayStub.cobrar).toHaveBeenCalledWith(180, expect.anything())

      expect(emailMock.enviarEmail).toHaveBeenCalledTimes(1)
      expect(emailMock.enviarEmail).toHaveBeenCalledWith(
        'premium@email.com',
        'Seu Pedido foi Aprovado!',
        expect.anything()
      )
    })
  })
})

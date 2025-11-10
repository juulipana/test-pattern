const CarrinhoBuilder = require('./builders/CarrinhoBuilder')
const CheckoutService = require('../src/services/CheckoutService')

describe('CheckoutService', () => {
  describe('quando o pagamento falha', () => {
    test('deve retornar null e não chamar outras dependências', async () => {
      const carrinho = new CarrinhoBuilder().build()

      const gatewayStub = { cobrar: jest.fn().mockResolvedValue({ success: false }) }
      const pedidoRepositoryDummy = { salvar: jest.fn() }
      const emailServiceDummy = { enviarEmail: jest.fn() }

      const checkoutService = new CheckoutService(
        gatewayStub,
        pedidoRepositoryDummy,
        emailServiceDummy
      )

      const pedido = await checkoutService.processarPedido(carrinho)

      expect(pedido).toBeNull()
      expect(gatewayStub.cobrar).toHaveBeenCalledTimes(1)
      expect(pedidoRepositoryDummy.salvar).not.toHaveBeenCalled()
      expect(emailServiceDummy.enviarEmail).not.toHaveBeenCalled()
    })
  })
})

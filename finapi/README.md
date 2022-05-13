## FinApi - Financeira

---

### Requisitos

- [x] Deve ser possível criar uma conta
- [] Deve ser possível procurar o extrato bancário do cliente
- [] Deve ser possível realizar um depósito
- [] Deve ser possível realizar um levantamento
- [] Deve ser possível procurar o extrato bancário do cliente por data
- [] Deve ser possível atualizar os dados da conta do cliente
- [] Deve ser possível obter os dados da conta do cliente
- [] Deve ser possível eliminar uma conta

---

### Regras de negócio

- [x] Não deve ser possível criar uma conta com um NIF já existente
- [] Não deve ser possível fazer um depósito numa conta não existente
- [] Não deve ser possível procurar o extrato de uma conta não existente
- [] Não deve ser possível fazer um levantamento de uma conta não existente
- [] Não deve ser possível excluir uma conta não existente
- [] Não deve ser possível fazer um levantamento quando o saldo for insuficiente

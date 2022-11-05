import { Email } from "../../../../src/domain/entity/user/value-object"

test('Não deve criar um e-mail', () => {
	const email = Email.create('otavio.teste.com')
	expect(email.isLeft()).toBe(true)
})

test('Deve criar um e-mail', () => {
	const email = Email.create('otavio@teste.com')
	expect(email.isRight()).toBe(true)
})
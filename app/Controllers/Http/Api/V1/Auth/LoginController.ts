import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class LoginController {
    async login({ request, auth, response }: HttpContextContract) {
        const payload = await request.validate({
            schema: schema.create({
                phone: schema.string({}, [
                    rules.required()
                ]),
                password: schema.string({}, [
                    rules.minLength(6),
                    rules.required()
                ]),
            })
        })

        const phone = await User.getParsedPhone(payload.phone)//User.getParsedPhone(request.input('phone'))
        const password = payload.password

        try {
            const token = await auth.use('api').attempt(phone, password)
            
            return response.json({
                "token": token,
                "message": "Login success"
            })
        } catch {
            return response.unauthorized('Invalid credentials')
        }
    }
}

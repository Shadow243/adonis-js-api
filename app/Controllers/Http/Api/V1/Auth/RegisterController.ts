import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Event from '@ioc:Adonis/Core/Event'
import CreateUser from 'App/Validators/CreateUserValidator'

export default class RegisterController {
    async register({ request, response }: HttpContextContract) {
        //validate payload before continue
        const payload = await request.validate(CreateUser)
  
        //create and store user instance
        const user = await new User()
            .fill({
                name: payload.name,
                email: payload.email,
                phone: await User.getParsedPhone(payload.phone),
                countryCode: await User.getParsedCountryCode(payload.phone),
                active: true,
                verified: false,
                password: payload.password
            })
            .save()
        //emit event before 
        Event.emit('new:user', user)

        // then return response
        return response.json({
            "user": user,
            "message": "User created successfuly"
        })
    }
}

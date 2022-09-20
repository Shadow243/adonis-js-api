import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import LoginController from 'App/Controllers/Http/Api/V1/Auth/LoginController'
import RegisterController from 'App/Controllers/Http/Api/V1/Auth/RegisterController'

Route.group(() => {
    Route.post('/login', async (ctx) => {
        return new LoginController().login(ctx)
    })
    Route.post('/register', async (ctx) => {
        return new RegisterController().register(ctx)
    })
    
    Route.post('/logout', async ({ auth, response }: HttpContextContract) => {
        await auth.use('api').revoke()
        return {
            message: "Déocnection reussie."
        }
    }).middleware('auth:api')
}).prefix('api/v1')

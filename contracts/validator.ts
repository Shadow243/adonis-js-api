// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
        phoneUnique(phone: string): Rule
    }
}

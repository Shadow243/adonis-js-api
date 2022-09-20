// import { string } from '@ioc:Adonis/Core/Helpers'
import { validator } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'


/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/


validator.rule('phoneUnique', async (_, [phone], options)=>  {
    const user = await User.findForPassport(phone)

    if (user !== null) {
        options.errorReporter.report(
            options.pointer,
            'phoneUnique',
            'phoneUnique validation failed',
            options.arrayExpressionPointer
        )
    }
})
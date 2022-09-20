import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public countryCode: string

  @column()
  public active: boolean

  @column()
  public verified: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public lastSeen: DateTime

  @beforeSave()
  public static async hashPassword(User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }

  public static async getParsedPhone(phone: string) {
    // const ph = request.input(key).replace(' ', '').replace('+', '');
    const ph = phone.replace(' ', '').replace('+', '');

    return ph.slice(-9);
  }

  public static async getParsedCountryCode(phone: string) {
    const ph = phone.replace(' ', '').replace('+', '');

    return ph.slice(0, -9); //OR: ph.substring(0, ph.length-9);
  }

  public static async findForPassport(identifier: string) {
    const user = await Database
      .query()  // 👈 gives an instance of select query builder
      .from('users')
      .where('email', identifier)
      .orWhere('phone', await User.getParsedPhone(identifier))
      .select('*')
      .first()

    if (user == null) {
      return null
    }
    return user
  }
}

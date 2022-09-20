import type { EventsList } from '@ioc:Adonis/Core/Event'

export default class User {
    public async onNewUser(user: EventsList['new:user']) {
    }
}

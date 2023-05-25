import { faker } from '@faker-js/faker';

export class FakeDataFactory {
  static createFakeFullName() {
    return faker.person.fullName();
  }

  static createFakeUsername() {
    return faker.internet.userName();
  }

  static createFakePassword() {
    return faker.internet.password({ length: 10 });
  }

  static createFakeAppName() {
    return `${new Date().getTime().toString()}-app-test`;
  }
}

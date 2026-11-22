import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly path = "/";
}

export const homePage = new HomePage();

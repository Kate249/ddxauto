import test from "@playwright/test";
import authCRMTestData from "@data/authCRM.json";
import api from "../../api.json"

test.describe.only("Тесты на авторизацию в CRM", async () => {
     test("Успешная авторизация в CRM", async ({ page })=> {
        test.step("Перейти на страницу входа", async () => {
            await page.goto(api.urls.crm_url);
        } );
      
        test.step("Заполнить форму авторизации и нажать Войти", async () => {
       await page.getByPlaceholder('Логин').fill(authCRMTestData.login);
       await page.getByPlaceholder('Пароль').fill(authCRMTestData.password);
       await page.getByRole('button', {name:'Войти'}).click();
     });

     test.step("Проверить, что пользователь находится в CRM и видит поле поиска клиента", async () => {
        await page.getByPlaceholder('Поиск клиента по номеру телефона').waitFor({state: 'visible', timeout: 3000 });
      });

     });
});
import test from "@playwright/test";
import authCRMTestData from "@data/authCRM.json";
import api from "../../api.json"

test.describe("Тесты на авторизацию в CRM", async () => {
     test("Успешнаое открытиес траницы 'Клиенты в клубе'", async ({ page })=> {
        test.step("Перейти на страницу входа", async () => {
            await page.goto(api.urls.crm_url);
        } );
      
       await test.step("Заполнить форму авторизации и нажать Войти", async () => {
       await page.getByPlaceholder('Логин').fill(authCRMTestData.login);
       await page.getByPlaceholder('Пароль').fill(authCRMTestData.password);
       await page.getByRole('button', {name:'Войти'}).click();
     });

        await test.step("Нажать Клиенты в клубе", async () => {
        await page.locator('[href*="/clients-in-club"]').click();
      });

     await test.step("Проверить, что пользователь находится на странице 'Клиенты в клубе'", async () => {
        await page.getByText('Фильтры').waitFor({state: 'visible', timeout: 3000 });
      });

     });
});
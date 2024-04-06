import test from "@playwright/test";
import authCRMTestData from "@data/authCRM.json";
import api from "../../api.json"

test.describe("Тесты на авторизацию в CRM", async () => {
     test("Успешная авторизация в CRM", async ({ page })=> {
        test.step("Перейти на страницу входа", async () => {
            await page.goto(api.urls.crm_url);
        } );
      
       await test.step("Заполнить форму авторизации и нажать Войти", async () => {
       await page.getByPlaceholder('Логин').fill(authCRMTestData.login);
       await page.getByPlaceholder('Пароль').fill(authCRMTestData.password);
       await page.getByRole('button', {name:'Войти'}).click();
     });

     await test.step("Проверить, что пользователь находится в CRM и видит поле поиска клиента", async () => {
        await page.getByPlaceholder('Поиск клиента по номеру телефона').waitFor({state: 'visible', timeout: 3000 });
      });

     });

     test("Неуспешная авторизация в CRM", async ({ page })=> {
      test.step("Перейти на страницу входа", async () => {
          await page.goto(api.urls.crm_url);
      } );
    
     await test.step("нажать Не помню пароль", async () => {
     await page.getByText('Не помню пароль').click();
   });

   await test.step("Заполнить поле email невалидным email", async () => {
   await page.getByPlaceholder('Email').fill(authCRMTestData.invalidLogin);
   await page.getByRole('button', {name:'Сбросить пароль'}).click();
   });


   await test.step("Проверить, что пользователь видит сообщение об ошибке", async () => {
      await page.getByText('К сожалению, у вас нет разрешения на смену пароля').waitFor({state: 'visible', timeout: 3000 });
    });

   });
});
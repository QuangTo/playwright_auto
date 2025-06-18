Matching dynamic locator

Can use build-in playwright OR, AND function for expect

```javascript
await page.locator('#gender_id,#ctl_gender').selectOption('ABC');
```

Use regex for matching testID

- Start with username
- Middle have facebook
- Can includes \_id at the end (\_id is optional)

```javascript
await page.testId(/^username_login(_id)?$/).check();
await page.testId(/^username_login.*facebook(_id)?$/).check();
```

```javascript
await page.locator('input[name^="user"][name$="end"]').check();
```

Check visible to prevent strict mode violation

```javascript
await page.getByRole('button', { name: 'Add' }).filter({ visible: true }).click();
```

Handle different id but on the page it perform same User function

```javascript
try {
  await Promise.race([
    page.getByTestId('ctl_clinic_q_3_3').check(),
    page.getByTestId('ctl_personal_q_1_0').check(),
    page.getByTestId('ctl_user_q_1_1').check()
  ]);
} catch {
  console.warn('Neither checkbox was found and checked.');
}
```

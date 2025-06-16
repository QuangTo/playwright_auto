Matching dynamic locator

Can use build-in playwright OR, AND function for expect

```
      await page.locator('#ctl_gender_id,#ctl_gender').selectOption('ABC');
```

Use regex for matching testID

- Start with username
- Middle have facebook
- Can includes \_id at the end (\_id is optional)

```
    await page.testId(/^username_login(_id)?$/).check()
    await page.testId(/^username_login.*facebook(_id)?$/).check()
```

```
    await page.locator('input[name^="user"][name$="end"]').check()
```

Check visible to prevent strict mode violation

```
    await page.getByRole('button', {name:"Add"}).filter({visible:true}).click()
```

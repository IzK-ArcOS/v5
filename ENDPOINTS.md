# ArcOS API Endpoints

This file will contain endpoints for the ArcOS API as well as required data and response values.

## /auth

Generate a token from credentials in request body

<table>
<tr>
<td rowspan=3>/auth</td>
<td>Request body</td><td>

```json
{
  "username": "Izaak",
  "password": "<password>"
}
```

</td></tr>
<tr><td>Example response</td><td>

```json
{
  "valid": true,
  "token": "3705d8d0-b0d6-4537-b841-e9075a031cbd",
  "username": "Izaak"
}
```

</td></tr>
<tr><td>Access Denied (401 or 403)</td><td>

```json
{
  "valid": false,
  "error": {
    "title": "Can't generate token",
    "message": "The username and/or password are incorrect."
  }
}
```

</td></tr>
<tr>
<td rowspan=3>/user/properties</td>
<td>Request headers</td><td>

```json
{
  "Authorization": "Token 3705d8d0-b0d6-4537-b841-e9075a031cbd"
}
```

</td></tr>
<tr><td>Example response</td><td>

```json
{
  "sh": {
    "taskbar": {},
    "window": {},
    "desktop": {},
    "start": {}
  },
  "acc": {},
  "volume": {},
  "disabledApps": []
}
```

</td></tr>

</table>

More to be added later...

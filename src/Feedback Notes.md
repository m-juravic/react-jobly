# Feedback Notes

## Decoding Payload
Use `jwt-decode` package to decode the token instead of using `atob`. We do not need to do any splitting as well.

## Authentication
1. Since token will be changing a lot, we want to move that into a state. The initial value for the token will be our function called `getTokenFromLocalStorage`.
2. We should use our service `Api.js` to get the currentUser instead of making an axios request. We can override the token in JoblyApi by just doing `JoblyApi.token = <new token>`
3. Update the user state.
4. Our useEffect will grab the token from the state. We listen to the token so whenever the token updates our useEffect will trigger. If the token is present, we will run fetchUserDataFromApi(), otherwise we will reset the user back to default values.
5. Be pendantic with variable naming instead of `setToken` say `setTokenToLocalStorage`. Update the token.
6. Instead of updating user state in handleLogin, our useEffect will do it because the token has changed.

### Logout
We do not need to Navigate() because if set token to null it will trigger a re-render. Also our NavLink will redirect to the homepage. Make sure to wipe the token from local storage!

### Registration
1. Do not use try catch here! Otherwise it will override the try catch in the form component.
2. Set token to local storage
3. Update token to state -> trigger useEffect


## Alerts
1. Pass our error messages and map through it in our Alert component.
2. Don't forget to add a key




# Questions
1. What's the difference between:

```jsx
    {formErrors ? <Alert messages={formErrors} type="danger" /> : null}

    {formErrors.length > 0 ? <Alert messages={formErrors} type="danger" /> : null}
```
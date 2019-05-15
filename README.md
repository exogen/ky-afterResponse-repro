To test:

```
$ yarn
$ yarn test
```

Under certain conditions, simply adding an `afterResponse` hook causes the
response Promise to hang (never be resolved).

- Removing the hook makes it work, so it must be something about the hook or
  cloning the response.
- Switching to fetch makes it work, so it’s not that the request or response
  are faulty.

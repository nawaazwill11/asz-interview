# ASZ Interview Assessment

Run `yarn && yarn start`

### Important

The post loading is capped to 10 posts. This can be altered by adjusting the `POST_CAP` variable location in the `src/app/config.ts` file.
If the cap is removed, the server sends a **429 - Too many requests** error.

The app works as mentioned in the requirements.
There are possible differences between the UI being developed and the one in the given.

The app uses _local storage_ to save the user's id. This helps the app to work as expected even after the page reload.
The code is not well-documented but is it pretty straight-forward.

### Tech used

-   _Create React App_ for frontend development with _TypeScript_
-   _Redux_ with _Redux Toolkit_ for a centralized state access and management
-   _Ant Design_ and _SCSS_ for styling
-   _ESLint_ and _Prettier_ for linting and formatting
-   _Husky_ and _Lint Staged_ for pre-commit checks

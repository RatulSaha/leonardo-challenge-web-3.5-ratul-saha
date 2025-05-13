# leonardo-challenge-web-3.5-ratul-saha

This repository contains the code for v3.5 challenge from the Web Team at Leonardo AI. Submitted by Ratul Saha.

## Project details

This project showcases information from The Rick and Morty world (a popular animated science fiction sitcom) in a fast, responsive, web application. The conditions to be met can be found in the challenge brief (not included in this README).

[The final deployment](https://leonardo-challenge-web-3-5-ratul-saha.vercel.app/).

## Milestones

### v0.1: Basics and CI/CD setup

Success criteria:

- [x] The minimal technical requirements are installed. Bare installation is fine. This will include (1) [Next.js 15](https://nextjs.org/), (2) [ChakraUI](https://chakra-ui.com/), (3) [Apollo Client](https://www.apollographql.com/docs/react).
- [x] The CI/CD is deployed and tested with [Vercel](https://vercel.com) (free tier).

Output and findings (if any):

- [Deployed URL](https://leonardo-challenge-web-3-5-ratul-saha-bc1z1l8mv.vercel.app/).
- [GitHub at this point](https://github.com/RatulSaha/leonardo-challenge-web-3.5-ratul-saha/tree/c491609649008b66990a61315be65816b00161c0).
- Comments: None.

### v0.2: The required pages with auth set up.

Success criteria:

- [x] Home page is setup.
- [x] The `/explore` page is created with test content.
- [x] The `/explore` page can be accessed only if the user provides username and job title.
- [x] The `/auth` page is created to capture the username and job title.
- [x] The username can only include alphanumeric and the job title can be free flow text. Both will have a limit of 32 characters.
- [x] The "auth" info will be stored in localstorage so that it is persisted over a session.
- [x] From the `/auth` page, once the user details are saved, the users will be automatically forwarded to the `/information` page.
- [x] Only the "auth'ed" user (i.e., those who submitted username and job title) can access the content in the `/information` page. This check will be more rigourously checked once the API is wired up in later milestones.
- [ ] Separate `/404` and `/500` pages will be created to capture non-existent pages (404 error) and if a page render goes wrong with 500 error.

Output and findings (if any):

- Deployed URL: Not deployed yet.
- Comments: None.

### v0.3: The information is listed without the ability to expand.

Success criteria:

- [ ] [The GraphQL API](https://rickandmortyapi.com/documentation/#graphql) is wired up with the FE at `/information`. Note that the GraphQL is implemented in FE and not server-side.
- [ ] Three buttons provided to switch between Character, Location, and Episode (called `type` from now on).
- [ ] Once a type is selected, the user is able to see list of items of that particular type. The URL should be of structure `type={type}&page={pagenumber}`.
- [ ] A prev and next button is provided to paginate through the content. The prev and next buttons should be disabled accordingly when there are no content.

Output and findings (if any):

- Deployed URL: Not deployed yet.
- Comments: None.

### v1.0: Individual information of a type can be opened by click

Success criteria:

- [ ] Individual item can be clicked and a modal will open with all the details of the individual content.
- [ ] After v0.3, more details about which field to be added in the modal will be listed here.
- [ ] The content for the modal will be requested only after an item is clicked.
- [ ] The modal can be closed without losing the pagination.

Output and findings (if any):

- Deployed URL: Not deployed yet.
- Comments: None.

Potential improvements:

- [ ] Currently, it is assumed that only `/explore` page needs to be authed. If and when there are more auth'ed pages, we should do the following: (1) ensure to remember (likely in a URL param) which page the user is coming from and then forwarding them back there after `/auth` is done, (2) standardize the guards for checking if auth exists.

- [ ] There is no provision to update the username and job title once provided.

- [ ] Currently, there is no database or persistant storage for the user's username and job title, only localstorage.

- [ ] The error toast needs better styling. The padding is not being applied.

- [ ] The redirect to auth could be better (currently have flash of unstyled content).
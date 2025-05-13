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

- [Deployed URL](https://leonardo-challenge-web-3-5-ratul-saha-lc9caet0y.vercel.app/).
- [GitHub at this point](https://github.com/RatulSaha/leonardo-challenge-web-3.5-ratul-saha/tree/4f1d1f7cff9ad0bb79b9d1a8c9aa16404f8d7505).
- Comments: The customized 400 and 500 pages are not done in this round and will be pushed in subsequent milestones.

### v0.3: The information is listed without the ability to expand.

Success criteria:

- [x] [The GraphQL API](https://rickandmortyapi.com/documentation/#graphql) is wired up with the FE at `/explore`. Note that the GraphQL is implemented in FE and not server-side.
- [x] (Improved after going deeper into the API) The content for characters, locations, and episodes (called `type` from now on) will be tabbed. Users can switch between the tabs, and paginate within each tab. In later versions, we can let users filter their results within a tab as well.
- [x] Since the API provides number of pages within the info (not always common in GraphQL APIs), we can do explicit paginations instead of only prev/next pagination. Users can then jump within any page within a type.
- [x] We intend to retain the entire user experience state within the URL. At any point of the user interaction, the URL will be unique to determine which page the user is on not only for the current tab, but all tabs.
- [x] If we design this right, we will be able to extend this feature to include remembering all filters of each tab as well in the URL.
- [x] The URL have to include — as a param — a JSON object containing the information of the user in which page (and later which filters applied). The design example of the JSON will be roughly as follows:

```
{
    'characters': {
        page: 3
        // Later can be expanded to include individual filters as well
    },
    'locations': {
        page: 2
    },
    'episodes': {
        page: 4
    }
}
```

- [x] This JSON uniquely represents the user state. We will encode this JSON (stringified) with base64 so that it can be two-way hashed. Note that we still will have to use `encodeURIComponent()` to ensure that the hash is URL-safe.

- [x] In the `/explore` page, if no JSON is present, the JSON will be defaulted to first page for all types.


Output and findings (if any):

- [Deployed URL](https://leonardo-challenge-web-3-5-ratul-saha-6ivqzfdm2.vercel.app).
- [GitHub at this point](https://github.com/RatulSaha/leonardo-challenge-web-3.5-ratul-saha/tree/d0de293a84980568a9ac609bdebc6657c534a995).
- Comments: None.

### v1.0: Individual information of a type can be opened by click

Success criteria:

- [x] Individual item can be clicked and a modal will open with all the details of the individual content.
- [x] After v0.3, more details about which field to be added in the modal will be listed here.
- [x] The content for the modal will be requested only after an item is clicked.
- [x] The modal can be closed without losing the pagination.

Output and findings (if any):

- [Deployed URL](https://leonardo-challenge-web-3-5-ratul-saha.vercel.app/).
- Comments: None.

Potential improvements:

- [ ] Currently, it is assumed that only `/explore` page needs to be authed. If and when there are more auth'ed pages, we should do the following: (1) ensure to remember (likely in a URL param) which page the user is coming from and then forwarding them back there after `/auth` is done, (2) standardize the guards for checking if auth exists.

- [ ] There is no provision to update the username and job title once provided.

- [ ] Currently, there is no database or persistant storage for the user's username and job title, only localstorage.

- [ ] The error toast needs better styling. The padding is not being applied.

- [ ] The redirect to auth could be better (currently have flash of unstyled content).

- [x] The `charactersList` file has a casing issue. The correct casing isn't cached, can be looked into later. Fixed by changing the filename for now.

- [ ] The list of episodes in the character modal needs better handling when there are too many episodes for a character. Similar for when a location has too many residents.

- [x] Known bug: If a modal is opened (let's say character), and then closed, and the user moves to a different page, the previous modal pops up in some cases uninvited. Fixed by nullifying the selected ID for a modal when the modal closes.

- [ ] The number of items in a page of characters is 20 (can't change in the API call, it seems), which may make the alignment look a tad bit odd.

- [x] Nice to have: Skeleton for individual card when the data is loading. Done, but could be better.

- [ ] Filters for each type can be added quite easily (and with persistent memory in URL).
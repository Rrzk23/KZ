**Backend for KZ.io**

**Dev Tech Stack**
- Typescript
- SuperTest & Jest
- Eslint
- MongoDB

**Object in database:**

- Admin which is me, has an admin name and password for initial setup.
- project which has title, description, url(s) for the image(s)
- comments that viewer leaves on should also showing reply.
- possible strucute collections of comments and comments = set of(parentComments)
- then each parent comment contains all its child comments.
- child comments should have a pointer to the possible reply comment by default is the parent comment.

**Functionality**

- Admin should be able to login, sign up and get authenticated.
- Project should be able to create a new project, update existing project and delete existing project whil these route should be protected by the authentication.
- Viewer should be able to create, edit, delete their own comment and Admin should be able to delete their comment.
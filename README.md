<h1 align="center">Welcome to User Management App 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> A simple user management application where users can perform actions such as:
> - Adding new users
> - Displaying a list of users
> - Updating user information
> - Deleting users
> - Managing loading state and error handling

## Install

```sh
bun install
## Usage

```sh
bunx expo run:android
```

## Key Files and Directories

> components/: Contains reusable UI components.
> screens/: Contains screen components like ManageScreen.js where the main user management logic is implemented.
> providers/: Contains context providers like AuthenticatedUserProvider.
> hooks/: Contains custom hooks like useTogglePasswordVisibility.
> navigation/: Contains navigation-related files.
> utils/: Contains utility functions.

## Key Functions and Components
> ManageScreen.js:
>> addUser: Function to add a new user.
>> deleteUser: Function to delete a user.
>> editUser: Function to edit user details.
>> renderUser: Function to render a user item.
>> setUsers: Function to set the list of users.
>> sortUsers: Function to sort users based on criteria.
>> sortedUsers: State variable holding sorted users.

## Author

👤 **Trung Koii**

* Github: [@trungkoiiNe](https://github.com/trungkoiiNe)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
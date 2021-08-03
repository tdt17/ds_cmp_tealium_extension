# ds_cmp_tealium_extension
Repository for Javascript Tealium extensions


## About The Project

The goal of this project is to generalize Tealium extensions for the usage on different profiles
and to centralize development.

The project is hosted on GitHub. Changes will automatically be synced by Tealium.

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps:

git clone https://github.com/spring-media/ds_cmp_tealium_extension.git

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/spring-media/ds_cmp_tealium_extension.git
   ```
2. Change into Root Directory and Install NPM packages
   ```sh
   npm install
   ```
3. Run the Tests

   ```sh
   npm run test
   ```


## Extensions
### CMP Interaction Tracking
Extension for triggering Adobe Analytics tracking events of the consent layer application (cmp).

In order to make the extension work in all Tealium profiles, the Adobe TagId of each profile needs to be determined.
This is done by a static mapping of the profile's name to a certain TagId. Be careful to update the 
mapping table inside the extension, in case profiles or Adobe tags are changing.

##
Good luck!
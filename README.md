# ds_cmp_tealium_extension

Repository for Javascript Tealium extensions

## About The Project

The goal of this project is to generalize Tealium extensions for the usage on different profiles and to centralize
development.

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
This is done by a static mapping of the profile's name to a certain TagId. Be careful to update the mapping table inside
the extension, in case profiles or Adobe tags are changing.

#### Status of Rollout/Implemention

<table>
    <tr>
        <th>Media Brand</th>
        <th>Status</th>
    </tr>
    <tr>
        <td>Welt.de</td>
        <td>&#10004;</td>
    </tr>
    <tr>
        <td>Bild.de</td>
        <td>&#10004;</td>
    </tr>
    <tr>
        <td>BZ.de</td>
        <td>&#10004;</td>
    </tr>
    <tr>
        <td>Autobild.de</td>
        <td>&#10060;</td>
    </tr>
    <tr>
        <td>Computerbild.de</td>
        <td>&#10060;</td>
    </tr>
    <tr>
        <td>Fitbook.de</td>
        <td>&#10004;</td>
    </tr>
    <tr>
        <td>myHomebook.de</td>
        <td>&#10004;</td>
    </tr>
    <tr>
        <td>Stylebook.de</td>
        <td>&#10004;</td>
    </tr>
    <tr>
        <td>Techbook.de</td>
        <td>&#10004;</td>
    </tr>
    <tr>
        <td>Travelbook.de</td>
        <td>&#10004;</td>
    </tr>
    <tr>
        <td>RollingStone.de</td>
        <td>&#10060;</td>
    </tr>
    <tr>
        <td>MetalHammer.de</td>
        <td>&#10060;</td>
    </tr>
    <tr>
        <td>MusikExpress.de</td>
        <td>&#10060;</td>
    </tr>
</table>

##

Good luck!
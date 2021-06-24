# ds_cmp_tealium_extension
Repository for Javascript Tealium extensions

![example workflow](https://github.com/spring-media/ds_cmp_tealium_extension/actions/workflows/node.js.yml/badge.svg)

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#extensions">Extensions</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The DS_CMP_TEALIUM_EXTENSION project aims to centralize the Tealium extensions in use for all different AS Media Brands. 
Hereby, the individual Tealium extensions for each </br>
media brand can be removed and the individual configuration for the
extension for each AS media brand passed as parameters to the general Tealium extension. 

The project is hosted on Github in order to allow developers to make changes in the extension which will be automatically synced by Tealium. 

The aim of this project is hence to provide more transparency and less individual Configuration of the extensions for
each AS media brand. 

The Tealium extension is unit tested with JEST; changes to the extension should be aligned with the implementation of 
tests accordingly. 

### Built With

* [https://nodejs.org/en/](14.8.0)
* [https://www.npmjs.com/](7.5.2)
* [https://jestjs.io/](^27.0.4)



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

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/spring-media/ds_cmp_tealium_extension/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

Bastian Bechtle - bastian.bechtle.extern@axelspringer.com   
Heiko   Kampe   - heiko.kampe.extern@axelspringer.com  

Project Link: [https://github.com/spring-media/ds_cmp_tealium_extension](https://github.com/spring-media/ds_cmp_tealium_extension)


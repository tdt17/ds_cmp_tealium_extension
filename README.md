# ds_tealium_extension

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

### CMP Interaction Tracking Extension

Extension for triggering Adobe Analytics tracking events of the consent layer application (cmp).

In order to make the extension work in all Tealium profiles, the Adobe TagId of each profile needs to be determined.
This is done by a static mapping of the profile's name to a certain TagId. Be careful to update the mapping table inside
the extension, in case profiles or Adobe tags are changing.


### Adobe DoPlugins Extension

This extension is the result of a refactoring and generalization process of the various existing DoPlugins extensions.
The goal of the refactoring was to have only one centralized version of this extension which can be used on all of the profiles.

The extension contains features which are needed for the Adobe Analytics tracking.

The different features are organized as simple Javascript objects which are attached to the global S-Object which 
is provided by the Adobe Analytics tag.

#### s._init
Starting point of the extension. Contains all functionalities which needs to get executed (once) on every page view
and global tracking configurations.

#### s._doPluginsGlobal
Global doPlugins callback function. It contains all features which needs to get executed an every tracking call. This
function needs to be get called from within the doPlugins function of every profile.

#### s._utils
A collection of functions which get used by different features. 

#### s._articleViewTypeObj
Tracking of the different marketing channels by evaluating the referring page of an article.

#### s._setExternalReferringDomainEvents
Setting additional events depending on the referrer context.

#### s._setKameleoonTracking

#### s._setTeaserTrackingEvars
Tracking of the homepage teaser clicks.

#### s._bildPageNameObj
Setting/Modification of the tracking parameter pageName only for Bild.

#### s._campaignObj
Adobe marketing campaigns tracking.

#### s._scrollDepthObj
Scroll depth tracking: How far down did a user scroll the page before he/she clicks on a link?
The actual tracking of this information happens on the next page view. This feature uses the Adobe plugin 'getPercentPageViewed'.

As a side effect the property s._ppvPreviousPage gets set which is used by other features (!!!).

Because the needed property s.pageName is not available on initialization of the extension it needs to get called from
the global doPlugins callback (even though it should be executed only once). 

#### s._ICIDTracking
Some internal campaign tracking.

#### s._eventsObj
Handling of the important s.event tracking property. The event property can contain several values and is set in
context of the doPlugins callback.

#### s._plusDensityObj
'Plusdichte' tracking. 

Good luck!
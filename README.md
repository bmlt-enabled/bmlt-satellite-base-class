DESCRIPTION
-----------

The Basic Meeting List Toolbox (BMLT) is a powerful, database-driven system for tracking NA meetings. It is NOT an official product of [NA](http://na.org). Rather, it is a project designed and implemented by NA members, and meant to be used by official NA Service bodies.

This project is a CMS "base." It has a lot of functionality built into it, such as administration and various renderers, but in a "CMS agnostic" fashion. This class is an abstract class that needs to be subclassed and extended. It uses a [Presentation Model](http://martinfowler.com/eaaDev/PresentationModel.html) pattern, and extensions are responsible for supplying Model storage management and View connectivity.

REQUIREMENTS
------------

The project requires a functioning [BMLT root server](http://magshare.org/blog/installing-the-root-server/).
It does not implement a root server, but connects to an existing one.
It requires PHP 5.0 or above.

This class uses the BMLT Satellite "Driver" Class, which is available [on BitBucket, here](https://bitbucket.org/bmlt/bmlt-satellite-driver.git).

INSTALLATION
------------

The instructions for employment of this class are on [this page](http://bmlt.magshare.net/specific-topics/bmlt-satellite-base-class/).

CHANGELIST
----------
***Version 3.3.4** -TBD*

* Refactored to make the code more straightforward and reusable.
* Refactored this file for better markdown display.

***Version 3.3.3** -April 9, 2016*

* Fixed a bug that could bork the [bmlt_table](http://bmlt.magshare.net/satellites/the-fast-table-display/) shortcode when there are no parameters specified.

***Version 3.3.2** -April 9, 2016*

* Added a "breaker" div element to the [bmlt_table](http://bmlt.magshare.net/satellites/the-fast-table-display/) display.
* Work on improving code quality.
* Added more style hooks to the [bmlt_table](http://bmlt.magshare.net/satellites/the-fast-table-display/) shortcode display.
* Fixed a bug in the simple and table shortcodes that didn't honor just the settings ID (without the "##-##" splitter).

***Version 3.3.1** -April 6, 2016*

* Made the weekday tab overflow hidden.
* The format circles now float to the right.
* Added a display for days with no meetings.
* Fixed a bug in the [bmlt_table](http://bmlt.magshare.net/satellites/the-fast-table-display/) shortcode, where the loading throbber would get replaced too quickly when selecting weekday tabs.
* Corrected a bug that allowed "00:00" times (should be "Midnight").
* Fixed a bug in the "simple map search" that displayed the info windows offset.

***Version 3.3.0** -April 4, 2016*

* Made it so that we can have specialized themes, amied at only certain shortcodes.
* Complete rewrite of the [bmlt_table](http://bmlt.magshare.net/satellites/the-fast-table-display/) shortcode. Made it so that it can have simpler theming and be more responsive.

***Version 3.2.4** -April 1, 2016 (Happy April Fools'!)*

* Broke the table styling out into separate files that are all loaded at once. This allows a lot more flexibility when implementing the table display.
* Tweaked the GNYR style.
* The JavaScript had a fundamental error that prevented multiple instances of the table. That's been fixed.

***Version 3.2.3** -March 30, 2016*

* Got rid of an undeclared variable warning.
* Fixed a bug that caused rendering issues with the new table shortcode on Internet Exploder.
* Fixed a minor style issue, where the selection triangle would flow below the text in large text situations.
* Changed the styling for the selected header triangle to make the table display a bit more responsive.

***Version 3.2.2** -March 29, 2016*

* The JavaScript errors were more extensive than first thought. They should really be fixed, now.

***Version 3.2.1** -March 29, 2016*

* Fixed a JavaScript bug introduced at the last minute in 3.2.0.

***Version 3.2.0** -March 29, 2016*

* Fixed a style problem with the default search, where the map and text might be outdented by 8 pixels.
* Fixed the "Google Maps included two or more times" warning.
* Removed unnecessary new search and duration items from admin page.
* Fixed an issue where WordPress would sometimes HTML-entity the ampersand (&) character.
* Added a very significant new shortcode: [bmlt_table](http://bmlt.magshare.net/satellites/the-fast-table-display/).

***Version 3.1.1** -March 16, 2016*

* Added support for cookie- and HTTP query-based language selection.

***Version 3.1.0** -March 7, 2016*

* Added Italian translation.
* Some fairly fundamental changes to support HTTPS.

***Version 3.0.28** -August 15, 2015*

* Added Portuguese translation (Brazil).

***Version 3.0.27** -May 25, 2015*

* Removed the "0" timeout from the location determination code in the basic BML shortcode handler, in an effort to address an IE11 issue.
* Fixed an issue with the results of nouveau map searches returning unsorted.
* Fixed a few CSS errors in the themes.

***Version 3.0.26** -January 31, 2015*

* Fixed an issue with the extra fields display in the regular shortcode display details.
* Fixed an issue where the arbitrary fields were actually creating too many results.
* Now hide the distance_in_km/miles parameters in the meeting details (these are internal parameters).

***Version 3.0.25** -November 22, 2014*

* Fixed a CSS issue with the admin display map. Some themes (especially responsive ones) declare a global max-width for images. This hoses Google Maps, and has to be compensated for.
* Added full support for arbitrary fields. This was an important capability that was left out after Version 3.X

***Version 3.0.24** -July 31, 2014*

* Added a user agent to the cURL call, as some servers filter out cURL.
* Fixed an annoying admin bug that could cause new options to report an incorrect ID.

***Version 3.0.23** -July 17, 2014*

* Added Danish localization.

***Version 3.0.22** -February 28, 2014*

* Fixed a small bug in the add new settings handler.

***Version 3.0.21** -February 22, 2014*

* Some work to make the code easier to debug, and also to account for non-standard TCP ports.

***Version 3.0.20** -December 31, 2013*

* Fixed a character set issue that affected Internet Exploder.

***Version 3.0.19** -December 7, 2013*

* Added French localization

***Version 3.0.18** -September 7, 2013*

* Minor German localization corrections.
* Removed the useless "New Search URL" text box from the admin.
* Fixed a number of JavaScript issues with the [bmlt_mobile](http://bmlt.magshare.net/satellites/cms-plugins/shortcodes/) shortcode.

***Version 3.0.17** -July 1, 2013*

* Corrected German localization.
* Added the ability to specify which day weeks begin (in Europe, it is common for weeks to begin on Monday).

***Version 3.0.16** -May 22, 2013*

* Added German localization.

***Version 3.0.15** -May 19, 2013*

* Fixed a small issue with the admin sheet, where entering text into the CSS box would not immediately trigger a "dirty" sheet.

***Version 3.0.14** -May 18, 2013*

* Fixed a possible issue with some initial calls being pooched by ampersands being represented as '&amp;' in the URI.

***Version 3.0.12** -May 16, 2013*

* Added some code to reduce warnings in Drupal 7, if modules use nested arrays in the parameters.

***Version 3.0.11** -May 13, 2013*

* Reduced the number of times that the marker redraw is called in the standard [bmlt](http://bmlt.magshare.net/what-is-the-bmlt/sample-bmlt-searches/the-standard-bmlt-shortcode/) shortcode handler.
* Fixed an issue with CSS that caused displayed maps to get funky.

***Version 3.0.10** -May 5, 2013*

* Fixed a bug, in which the first set of results for a search would display too many "red" map icons.

***Version 3.0.9** -May 4, 2013*

* Removed some PHP warnings.

***Version 3.0.8** -April 28, 2013*

* Added support for display of military time.

***Version 3.0.7** -April 21, 2013*

* The string search was being improperly handled. This has been fixed.
* Moved the project to Bitbucket.

***Version 3.0.6** -April 18, 2013*

* Improved the curl call functionality.

***Version 3.0.5** -April 16, 2013*

* Fixed a bug in the Swedish translation.

***Version 3.0.4** -April 15, 2013*

* Fixed a bug caused by the modifications for the new admin browser.

***Version 3.0.3** -April 15, 2013*

* Fixed a bug in the new Swedish localization.

***Version 3.0.2** -March 30, 2013*

* Added a default duration.
* Uncommented the adjustment for grace period.
* Added a link to the Google Maps for each meeting's details.
* Fixed a bug that screwed up localizations.
* Added a new Swedish localization.
* Updated the driver to preserve the session across the curl call.
* Added support for a "logged in" mode. This allows the plugin base class to be used by observers, in the root server.

***Version 3.0.1** -January 28, 2013*

* Fixed an issue that caused conflicts with some installations.

***Version 3.0.0** -January 26, 2013*

* Substantial rework to support new functionality.
* Decided to make it version 3.0, in order to coincide with the new plugins.

***Version 1.2.4** -May 13, 2012*

* Fixed a nasty bug in the admin interface that could create multiple empty settings.

***Version 1.2.3** -April 27, 2012*

* added some JavaScript "hooks" to allow more precise control of the new map search.

***Version 1.2.2** -March 28, 2012*

* Added an alert to the new map search, if no meetings were found in a clicked search (before, there was no alert).

***Version 1.2.1** -December 31, 2011*

* Removed some errant CSS.
* Now strip out the [bmlt_mobile](http://bmlt.magshare.net/satellites/cms-plugins/shortcodes/) shortcode if the page is not a mobile page. This allows the shortcode to be used, as the comment version is stripped by "code cleaners."

***Version 1.2.0** -November 22, 2011

* Added the ability to have multiple localizations. It's a bit clunky, but this is the best way to get it working.
* Corrected some minor validation issues with the new map search DOM tree.

***Version 1.1.7** -September 2, 2011*

* Fixes a JavaScript Error with the new map search on Internet Explorer.

***Version 1.1.6** -August 17, 2011*

* Minor fixes to the default styles in the themes, in order to make the info windows look better.

***Version 1.1.5** -August 16, 2011*

* Workaround for a Firefox bug that renders the popup menus in the info windows worthless.

***Version 1.1.4** -August 12, 2011*

* Fixes a couple of minor theme/style issues.
* Mitigates a strange Firefox bug that caused weird page loads when closing the location area.

***Version 1.1.3** -August 8, 2011*

* Implements an entirely new, Google Maps API V.3-based map search.

***Version 1.1.2** -July 16, 2011*

* I now check for an ob_level before doing an ob_end_clean(). This is because notices were being posted when there was no ob_level.

***Version 1.1.1** -July 9, 2011*

* Added unit tests for the new change capabilities.

***Version 1.1.0** -June 25, 2011*

* Added the capability to specify changes.

***Version 1.0.8** -June 20, 2011*

* Added a connection to a specific localhost BMLT root as a default, if the server is localhost (specific to the development machine).

***Version 1.0.7** -June 19, 2011*

* First release as a factored project.
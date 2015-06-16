Note: Busy this week, will continue development next week (15-06).
Open an issue if you'd like me to include other libraries. Do take into account I will run a web crawler to determine whether or not the added bloat (in terms of sheer size) will make a measurable difference in terms of privacy exposition).

<h1 align="center">local-load</h1>
<h1 align="center">(continued)</h1>

Load popular JavaScript libraries from a local resource, as opposed to over the Web, using valid HTML5 compliant custom data attributes. Currently supports all JavaScript files listed on the Google AJAX Library API.

* [Overview](#overview)
* [Downloads](#downloads)
* [Contributing](#contributing)
* [License](#license)

#### Overview
local-load, unlike uBlock's now non-existent local-mirroring feature (a sad day for us all), doesn't cache js libraries upon fetching them for later use; rather, it comes bundled with a myriad of them, which are constantly updated by the maintainer (myself, for the time being), and loaded from 'resource://localload/', thereby:
* Reducing your privacy exposure (you won't connect to THEIR servers);
* Saving bandwidth by intercepting calls to these libraries and loading them from your computer, rather than fetching them over the web;
* Loading pages slightly faster, a direct consequence of saving bandwidth.

#### Compatibility
###### Other addons:
If the JavaScript framework comes from a domain that uMatrix/NoScript/Policeman would block, then the request would not even be made and local load would not replace the script. If the domain is allowed by any of the above addons, then local load will work as intended.
###### Firefox:
Supports Firefox/Firefox-based browsers [4.* - current].

#### Benchmarks
[Coming soon](https://github.com/gorhill/uBlock/wiki/Reference-benchmark)

* local load:
* local load + [uBlock](https://github.com/gorhill/uBlock):

Methodology:

#### License
[GPL v2](https://github.com/CrisBRM/local-load/blob/master/README.md)




## TODO (for now; more will come):
* [Merge some jquery/jquery-ui/webfontloader js files](https://github.com/dfsq/compressJS.sh);
* Minify ALL js frameworks (10%);
* Probably more of the above;
* Redesign logo;
* Run benchmarks;
* Add toggle to disable it on a per hostname basis;
* Create simple UI to achieve the above;
* Finish writing the README file.

#PRO TIP 
Do not install this extension until I say you can (breaks google's ReCaptcha, for instance, and it will keep breaking it until I update all the libraries, which will happen once I'm done merging and minifying them).

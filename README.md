# Bestjobs task

Did the first 3 main tasks. The template engine used for building the pages / components was Pug.js (ex jade), the task runner was Gulp which I used it to compile, concatenate and minify: *.pug, *.scss (with Autoprefixer), *.js (with Babel), make responsive sizes for the logo images and to launch a local server with autorefresh.

The folder structure is as follows:
- _task: it contains the task pdf file
- _xd: it contains an Adobe XD file with the quick mockup I made for the my planned UX changes
- app: it contains all the development files (.json, .js, .scss, .pug, unprocessed images).
- dist: it contains the distribution (processed) files.

Viewing the distribution HTML files don't require the start up of the local server. The options for the local server are: gulp style (process the *.scss files), gulp javascript (process the *.js files), gulp pug (process the *.pug files), gulp imgResponsive (process the images) and gulp watch (launches the local server and auto-run all of the above functions).

### Home static (html)
The different parts of the page where built as pug components. The job listing part it's made using a pug mixin for card (app/pug/_elements/_job.pug) and iteration through an array for the data.

### Home api load (html)
Same as the above page description, with the following exceptions:
- the first 16 job posts are frontloaded;
- the rest of the job posts are loaded dynamically with ajax (batches of 16). On button click ('load more jobs') the cycle restarts.
The custom script is located in app/js/infinite.scroll.js

### Extras
- Added polyfill for 'position: sticky' in legacy browsers. This is used for navbar and search area behaviours.
- Considering that the 'scroll events' can be computationally expensive I chose to use the Intersection Observer API, with polyfill for legacy browsers. It's used to detect when the search-box is becoming 'sticky' and also to determine when to load more posts in the home_api_page.html.



# UX Design changes

### Navbar (mobile)
- Added a 'Search button' that scrolls back to the search box. It helps users to quickly start a job search no matter how far they scrolled into the page. While the same thing could be achieved with a scroll to top button it feels more natural this way.

### Search box
- Replaced the input group icons with absolute positioned icons. This allows to keep a nice focus style and also eliminates the need for js (class change).
- On large screens, rather than jumping into view, I made the search-box to become 'sticky' when scrolled past it.

### Job post card
- Considering that the 3 pillars for visual perception are visual acuity, contrast sensitivity and color perception **the most important UX change for this project was to increase the font sizes, color contrast and spacing,** especially for the users of mobile devices. The website users are of all ages and have different visual perception, so making information easier to see is of paramount importance.
- At the moment, the eye-tracking pattern for parsing the job post information is not optimal, being a 'T' for mobile and a reverted 'Y' for large screens. So the second most important UX change was to align the text to the left to follow the most common 'F' reading pattern.
- Increased the visibility of the compnany rating, especially on devices. Also added the 'Responsive employer' tag for mobile view.
- Added the share button on the card, users should be able to share jobs without the extra clicks.
- The "Share" and "Love" buttons are in the peripherical view on mobile, but they have good enough contrast to be noticeble now.
- I removed the anchor that was covering the whole card's space, because we have multiple actions availabile on a post and a click/touch in the wrong place or 1mm outside the bounding box would lead to an unwanted action.

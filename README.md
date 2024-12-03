## KNOWN BUGS FIXED

- [ ] UpdatePreferences debounced hook doesnt update the settings properly. If settings changed stack up, the context on the frontside correctly updates all of them but the backend side only updates the most recent one.
- [ ] Light mode and high contrast works but dark mode and high contrast defaults to light mode. Might be because system doesnt make the differencew between the two and uses a single high contrast profile for both. No idea how to fix other than force the colors with javascript which I might not want todo.

## TODO

in order of importance:

- [x] Expand user preferences in rust side and make them load on app launch so that settings get saved.
  - [ ] Add a import/export settings feature that writes settings to a JSON or TOML file on the root folder of folder specified by the user.
- [x] Fully implement dark mode.
  - [ ] Test on other devices to see if it works. Currently changing the webview theme doesnt make the css @media (prefers-color-scheme: dark) work, don't know if this is a my distro problem or Linux problem even.
- [ ] Implement a ~~redis~~ cache for the expensive db queries. Have to look into other FOSS memory databases, possibly memcached for ease of use.
- [ ] Create an error handling crate/module that catches errors on components and shows them to the "Diagnostics" component on the lower panel, kinda like Zed does. Has to have at least 2 or 3 types of erros ("Error", "Warning", "Info"), with acording icons.
- [ ] Implement high contrast mode and add it to the accessibility button menu.
- [ ] For the first realease: create a Github workflow that automatically generates the binaries and test the programm for Fedora, Linu Mint, MacOS and Windows.
- [ ] Implement a global search function that creates an indexed set from an array of all the menus, submenus/titles and paragraphs inside the programm. Create a function that looks through every item in the DOM with a class or label of menu/submenu/paragraph and pushes to the array an object containing: { category: label, description: item.text, link: href }.
- [ ] Rewrite navbar using own code instead of react-router or tanstack's bloated library. Should have active links logic and maybe caching (have to look into caching).
- [ ] Possibly add authentication and support for multiple various "profiles" more suited for multiple accountants in a household or even company. Upper Panel should have the user logged in and all the clients under his account.
- [ ] Create a crash/fatal errors reporter that sends erros to an api, along with a track to the component where it happened and some privacy respecting context like OS info and such (have to look into this).
  - [ ] Create a dashboard with all the crashes and data sent to it. Hosted on my machine.

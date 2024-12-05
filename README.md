## BUGS TO FI

- [ ] UpdatePreferences debounced hook doesnt update the settings properly. If settings changed stack up, the context on the frontside correctly updates all of them but the backend side only updates the most recent one.

## TODO

in order of importance:

- [ ] Migrate to tanstack router from react-router.
- [x] Expand user preferences in rust side and make them load on app launch so that settings get saved.
  - [ ] Add a import/export settings feature that writes settings to a JSON or TOML file on the root folder of folder specified by the user.
- [x] Fully implement dark mode.
  - [ ] Test on other devices to see if it works.
- [ ] Implement useMemo for the caching of expensive computations.
- [ ] Create an error handling crate/module that catches errors on components and shows them to the "Diagnostics" component on the lower panel, kinda like Zed does. Has to have at least 2 or 3 types of erros ("Error", "Warning", "Info"), with acording icons.
- [ ] Implement high contrast mode and add it to the accessibility button menu.
- [ ] For the first realease: create a Github workflow that automatically generates the binaries and test the programm for Fedora, Linu Mint, MacOS and Windows.
- [ ] Implement a global search function that creates an indexed set from an array of all the menus, submenus/titles and paragraphs inside the programm. Create a function that looks through every item in the DOM with a class or label of menu/submenu/paragraph and pushes to the array an object containing: { category: label, description: item.text, link: href }.
- [ ] Rewrite navbar using own code instead of react-router or tanstack's bloated library. Should have active links logic and maybe caching (have to look into caching).
- [ ] Possibly add authentication and support for multiple various "profiles" more suited for multiple accountants in a household or even company. Upper Panel should have the user logged in and all the clients under his account.
- [ ] Create a crash/fatal errors reporter that sends erros to an api, along with a track to the component where it happened and some privacy respecting context like OS info and such (have to look into this).
  - [ ] Create a dashboard with all the crashes and data sent to it. Hosted on my machine.

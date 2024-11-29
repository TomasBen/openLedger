## TODO

in order of importance:

- [x] Expand user preferences in rust side and make them load on app launch so that settings get saved.
  - [ ] Add a import/export settings feature that writes settings to a JSON or TOML file on the root folder of folder specified by the user.
- [ ] Fully implement dark mode.
  - [ ] Test on other devices to see if it works. Currently changing the webview theme doesnt make the css @media (prefers-color-scheme: dark) work, don't know if this is a my distro problem or Linux problem even.
- [ ] Implement a redis cache for the expensive db queries.
- [ ] Implement a "search" feature that searches for clients, projects, tasks, etc. and shows them in a list. Use indexing/sets.
- [ ] Create an error handling crate/module that catches errors on components and shows them to the "Diagnostics" component on the lower panel, kinda like Zed does. Has to have at least 2 or 3 types of erros ("Error", "Warning", "Info"), with acording icons.
- [ ] Make the navbar be able to be resized with mouse.
- [ ] Rewrite navbar using own code instead of react-router or tanstack's bloated library. Should have active links logic and maybe caching (have to look into caching).
- [ ] Possibly add authentication and support for multiple various "profiles" more suited for multiple accountants in a household or even company. Upper Panel should have the user logged in and all the clients under his account.
- [ ] Create a crash/fatal errors reporter that sends erros to an api, along with a track to the component where it happened and some privacy respecting context like OS info and such (have to look into this).
  - [ ] Create a dashboard with all the crashes and data sent to it. Hosted on my machine.

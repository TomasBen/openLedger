## TODO

in order of importance:

- [ ] Expand user preferences in rust side and make them load on app launch so that settings get saved.
  - [ ] Add a import/export settings feature that writes settings to a JSON or TOML file on the root folder of folder specified by the user.
- [ ] Rewrite navbar using a less bloated library like "Crossroads" instead of react-router or tanstack's. Should have active links logic and maybe caching (have to look into caching).
- [ ] Fully implement dark mode and test in other devices. Currently changing the webview theme doesnt make the css @media (prefers-color-scheme: dark) work, don't know if this is a my distro problem or Linux problem even. Test on Windows machine to see if it works.
- [ ] Create an error handling crate/module that catches errors on components and shows them to the "Diagnostics" component on the lower panel, kinda like Zed does. Has to have at least 2 or 3 types of erros ("Error", "Warning", "Info"), with acording icons.
- [ ] Make the navbar be able to be resized with mouse.
- [ ] Possibly add authentication and support for multiple various "profiles" more suited for multiple accountants in a household or even company. Upper Panel should have the user logged in and all the clients under his account.
- [ ] Create a crash/fatal errors reporter that sends erros to an api, along with a track to the component where it happened and some privacy respecting context like OS info and such (have to look into this).
  - [ ] Create a dashboard with all the crashes and data sent to it. Hosted on my machine.

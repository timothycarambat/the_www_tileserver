# The Actual Worldwide Web


## This is a support service for "The World Wide Web" application.
This application is a simple tileserver that stands alone and serves tiles to
the application via an endpoint through the Leaflet api. By default this app loads and serves
files out of the `data` folder. If you hit the application on port 80 it will show whatever is in
the `public` folder or just a list of available geojson files.

To request tiles you should send a request like this
`http://localhost:8123/[geojson file name in data dir you want to source]/{z}/{x}/{y}.geojson`

This application is a fork of Erik Vullings geojson-tile-server NPM package, but has
been modified to take a coordinate GEOJSON and append it to an existing geojson file.

When a file is update the server then reloads the geojson files so tiles being served
are the most up to date ones.

You may need to create the `data` folder and you can copy the `sample.geojson` into the directory to get started.
Name it whatever you want.
If you change the main file when to appending results you are will need to modify and reserve
with the following changes
```
const geoJSONFile = path.join(__dirname, `../data/sample.geojson`);
options.data = './data'
options.port = 8123
```

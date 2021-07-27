# WMS App - _Web Mapping Service (WMS) using Open Geospatial Consortium (OGC)_

## Fundamental Assumption

- Windows OS 64bit
- PostgreSQL
- Postgis
- Tomcat
- Node package manager (_npm_)
- Ngrok (_for remote access_)

## Creating a spatial database

- Go to your start menu, look for pgAdmin III and open it.
- Connect to your server.
- Right click on databases and choose New Database.
- Supply a database name and click ok.
- Double click on the database you created.
- Right click on extensions and choose New Extension Scroll through the dropdown, look for postgis , and select it.
- Click ok to add the extension.
- Right click on extensions and choose New Extension
- Scroll through the dropdown, look for postgis_topology , and select it.
- Click ok to add the extension.

## Importing the shape file

- Obtain a copy of WorldCountries.zip
- Extract the archive.
- Go to your start menu, look for PostGIS 2.0 Shapefile and DBF Loader Exporter and open it
- Click View connection details and enter

```
username = postgres
password = your PostgreSQL password
database = the name of the spatial database
```

- Click ok
- Click Add file and browse to the folder where you extracted the archive.
- Select the .shp file and click ok.
- Change the SRID to a desired value _eg: 4326_
- Click on import

## GeoServer

- Obtain `geoserver.war.zip`
- Extract it the `zip` file
- Copy and paste the `.war` file in `%TOMCAT_INSTALLATION_DIR%/webapps/`
- Start Tomcat
- Open web browser and go to `http://localhost:8080/geoserver`
- The Geoserver Admin page should open up. Enter the geoserver credentials to login.

```
username = admin
passowrd = geoserver
```

## Connecting GeoServer to PostGIS

- Login to your geoserver admin page. (Intructions are in previous section)
- Click on `Workspaces` in the sidebar on the left side.
  click on `Add a new workspace`
- Supply a name for the workspace.
- For the URI can just append the name of the workspace to
  `localhost:%PORT%/geoserver/` where the `%PORT%` is the port number for your geoserver.
- You can look in the address bar of your browser if you have forgotten.
- Submit.
- Click `Stores` in the sidebar on the left side.
- Click `Add a new store` and choose `PostGIS`.
- Supply the values for the following fields.

```
Workspace = The workspace you created earlier.
Data source name = Enter a name for your data source here.
Database = The name of the spatial database that you created.
User = Your PostgreSQL username ( postgres ).
Passwd = Your PostgreSQL password.
```

- Save.
- Click `Layers` in the sidebar on the left side.
- Click `Add a new layer` and choose the data store you created under Add layer from Click `publish`.
- Under Bounding boxes click on `Compute from data` and under Lat/Lon bounding box click on `Compute from native bounds` and `Save`.
- Click `Layer preview` in the sidebar on the left
- Look for the layer that you created and choose PNG under select one to display a picture of the map.

## Access Geoserver remotely

- Enable IIS feature [help](https://www.how2shout.com/how-to/how-to-install-iis-web-server-on-windows-10-step-by-step.html#:~:text=Windows%2010%20IIS%20Install%201%20Enable%20Internet%20Information,of%20how%20to%20host%20an%20HTML...%20See%20More)
- Configure IIS and setup proxy in Geoserver [help](https://medium.com/random-gis-talks/access-geoserver-remotely-using-iis-b8cfb7742b9d)
- Start `ngrok` on port 80

### Update wms base url

- Navigate to `src\composables\useOpenLayers.js`
- Change to ngrok http url for remote use and to localhost url for local use
- Deploy locally or via netlify!

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

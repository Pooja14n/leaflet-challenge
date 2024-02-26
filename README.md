# leaflet-challenge
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, we have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

# Requirements
The requirements for this activity are broken into two parts:
1. Part 1: Create the Earthquake Visualization.  <br>
2. Part 2: Gather and Plot More Data (Optional with no extra points earning)

# Part 1: Create the Earthquake Visualization
Your first task is to visualize an earthquake dataset by completing the following steps:

1. Get the dataset. To do so, the below steps are followed:
   a. The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed page (https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and choose a dataset to visualize (I have selected the Dataset for "All Earthquakes in the Past 7 days": https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson). The following image is an example screenshot of what appears when the link is visited:

![3-Data](https://github.com/Pooja14n/leaflet-challenge/assets/144713762/0edcf48f-2514-4001-ade0-ae2d0b14bb92)

   b. When we click a dataset (such as "All Earthquakes from the Past 7 Days"), we will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:

   ![4-JSON](https://github.com/Pooja14n/leaflet-challenge/assets/144713762/42c3a7a4-d623-431f-ac8c-ec33f5914d7f)

2. Import and visualize the data by doing the following:
Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude. <br>
   a. The data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color. <br>
   b. Hint: The depth of the earth can be found as the third coordinate for each earthquake. <br>
   c. Include popups that provide additional information about the earthquake when its associated marker is clicked. <br>
   d. Create a legend that will provide context for your map data. <br>
   e. The visualization is as below:
   
   ![Untitled](https://github.com/Pooja14n/leaflet-challenge/assets/144713762/25177ab7-f65c-4265-8745-6b11a4c0f847)

# References
Referred to various class activity exercises, got support from Assistant Instructor, and websites: https://leafletjs.com/reference.html, https://stackoverflow.com/questions/59453642/how-to-add-legend-in-leaflet-map, https://htmlcolorcodes.com/, https://gis.stackexchange.com/questions/193161/add-legend-to-leaflet-map.

# Files submitted including this README File
-> leaflet-challenge Folder 
   a. static Folder -> css Folder -> style.css (contains the css script for this app) <br>
                    -> js Folder -> logic.js (contains the script for this visualization)
   b. index.html (contains the html srcipt where css, js, and leaflet package are referenced to) <br>
 
   

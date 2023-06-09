const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

const API_URL = 'https://gbfs.urbansharing.com/oslobysykkel.no';

app.use(cors());

app.get('/stations', async (req, res) => {
  try {
    const [infoDataResponse, statusDataResponse] = await Promise.all([
      axios.get(`${API_URL}/station_information.json`, {
        headers: { 'Client-Identifier': 'eddy-origoOppgave' },
      }),
      axios.get(`${API_URL}/station_status.json`, {
        headers: { 'Client-Identifier': 'eddy-origoOppgave' },
      }),
    ]);

    const infoData = infoDataResponse.data;
    const statusData = statusDataResponse.data;
    const lastUpdated = statusData.last_updated;

    const combinedData = infoData.data.stations.map((station, index) => {
      return {
        station_id: station.station_id,
        name: station.name,
        num_bikes_available: statusData.data.stations[index].num_bikes_available,
        num_docks_available: statusData.data.stations[index].num_docks_available,
      };
    });

    res.json({ last_updated: lastUpdated, stations: combinedData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
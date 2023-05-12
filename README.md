<br />
<p align="center">
  <img width="400" src="https://raw.githubusercontent.com/BeefBytes/Assets/master/Other/oslo_bysykkel.svg">
</p>

# 📚 About
ExpressJS API providing data for https://bysykkel.edy.io to display station status and information. 
The data is originally fetched from https://oslobysykkel.no/apne-data/sanntid. 
Only required data is taken from two endpoints and combined into one JSON endpoint. 

Live version of endpoint can be found at: https://bysykkel-api.edy.io/stations

Live version of frontend can be found at: https://bysykkel.edy.io/ 

Application is built using:
- ExpressJS
- Axios

# 🏗️ Deployment

## Docker Compose

<b>Clone repository</b><br />
```
git clone https://github.com/EdyTheCow/oslo-bysykkel.git
```

Production environment uses `node:lts-alpine` docker image for most lightweight deployment possible. Alpine images are also more secure due to the minimal packages which in return provides small attack surface. The image is automatically built from `Dockerfile` using GitHub Actions and can be used in any enviroment `ghcr.io/edythecow/oslo-bysykkel-api:master`.

Docker Compose file includes production ready set-up using Traefik reverse proxy. The certificates are generated using Let's Encrypt but Cloudflare is also available.

<b>Change enviroment variables</b><br />
Navigate to `prod-env/compose/.env` file and change the `DOMAIN` variable. Available variables:
| Variable | Example | Description |
|-|:-:|-|
| COMPOSE_PROJECT_NAME | prod_oslo-bysykkel-api | Docker compose container prefix |
| DATA_DIR | ../data | Location where data is stored |
| DOMAIN | example.com | Domain to access the application |
| CF_API_EMAIL | - | Cloudflare email (only used if CF is cert resolver) |
| CF_API_KEY | -| Cloudflare global API key (only used if CF is cert resolver) |

<b>Set correct acme.json permissions</b><br />
Navigate to `prod-env/data/traefik` and run:
```
sudo chmod 600 acme.json
```
This file will store the generated certificates.

<b>Launch prod environment</b><br />
Navigate to `prod-env/compose` and run:
```
docker compose up
```

<b>Access the application</b><br />
Navigate to the `DOMAIN` in your browser you have set earlier

# 🎛️ API Usage

## API endpoint
Your endpoint
```
https://<DOMAIN>/stations
```

Live version
```
https://bysykkel-api.edy.io/stations
```

## Data provided
There's currently one endpoint which provides following data:
| Data | Example
|-|-|
| last_updated | Time in unix / epoch format |
| station_id | Unique station ID |
| name | Name of the station |
| num_bikes_available | Currently available bikes |
| num_docks_available | Currently available docks |

## Sample data from endpoint
```json
{
  "last_updated": 1683916343,
  "stations": [
    {
      "station_id": "2358",
      "name": "Aker Brygge 3 mot Fergene",
      "num_bikes_available": 2,
      "num_docks_available": 13
    },
    {
      "station_id": "2357",
      "name": "Aker Brygge 2 mot Rådhusplassen",
      "num_bikes_available": 19,
      "num_docks_available": 5
    }
  ]
}
```
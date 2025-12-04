# Video Proxy for AIMLAPI

This is a small Node.js/Express service that proxies video generation
requests to AIMLAPI's `/v2/video/generations` endpoint.

## Prerequisites

- Node.js 18+ and npm installed locally.
- A valid `AI_ML_API_KEY` from AIMLAPI.

## Install dependencies

```bash
cd video-proxy
npm install
```

## Run locally

On Windows PowerShell:

```powershell
cd video-proxy
$env:AI_ML_API_KEY="YOUR_AIMLAPI_KEY_HERE"
npm start
```

You should see:

```text
Video proxy listening on port 8080
```

## Test with Thunder Client or Postman

- Method: `POST`
- URL: `http://localhost:8080/video/generate`
- Body: JSON

```json
{
  "model": "google/veo-3.1-text-to-video",
  "prompt": "A 5-second video of a cute cat playing with a ball, cinematic, 4k.",
  "duration": 5,
  "resolution": "720p"
}
```

If everything is configured correctly, the proxy will forward this request
to AIMLAPI and return the JSON response.

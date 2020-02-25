# Wikipeli

Wikipeli on simppeli React / Python -appi, jonka avulla voi etsiä nopeimman reitin jostain artikkelista Jeesus-artikkeliin. Peli on tuttu yläasteelta.

## Tekniset tiedot ja asennus
- Frontend pyörii reactilla portissa 3000. Frontendin asennus ja käynnistys hoituvat seuraavasti:
```
cd frontend
npm install
npm start
```
- Backend pyörii python/flask-pohjaisena portissa 5000. Se vastaa `/api/artikkelinnimi` -pyyntöihin etsimällä lyhyimmän reitin Jeesus-artikkeliin ja palauttaa tuolla reitillä hyödynnetyt artikkelit. Backendin asennat seuraavasti:
```
cd backend
python -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements
```

## Muuta
- Apissa ei ole mitään cachea, joten se toimii tuhottoman hitaasti. Kokeile aluksi joillakin jeesusta lähellä olevilla hakusanoilla, ellet halua odotella muutamaa kymmentä minuuttia

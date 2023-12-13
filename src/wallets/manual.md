# Bepalen bevoegdheid

De volgende velden zijn beschikbaar op het KVK Bevoegdheidskaartje in de wallet, waarbij de schuingedrukte gebruikt worden voor het bepalen van iemands bevoegdheid. [meer info](/verifier/docs) 

Organisatie niveau
- kvkNummer
- rsin
- naam
- handelsnamen
- typeEigenaar
- persoonRechtsvorm
- adres
- emailAdres
- telefoon
- sbiActiviteit
- registratieAanvang
- *datumUitschrijving*
- *registratieEinde*
- *bijzondereRechtstoestand*
- *beperkingInRechtshandeling*
- *buitenlandseRechtstoestand*
- *peilmoment*

Functionaris niveau
- geslachtsnaam
- voorvoegselGeslachtsnaam
- voornamen
- geboortedatum
- overlijdensdatum
- volledigeNaam
- typeFunctionaris
- functie
- functietitel
- *soortBevoegdheid*
- *beperkingInEurosBevoegdheid*
- *overigeBeperkingBevoegdheid*
- *isBevoegdMetAnderePersonen*
- *typeVolmacht*
- *beperkingInGeldVolmacht*
- *beperkingInHandelingVolmacht*
- *heeftOverigeVolmacht*
- *omschrijvingOverigeVolmacht*
- *magOpgaveHandelsregisterDoen*
- *bijzondereRechtstoestandFunctionaris*
- *beperkingInRechtshandelingFunctionaris*
- *schorsingAanvang*
- *schorsingEinde*
- *handlichting*

Interpretatie bevoegdheid
- heeftBeperking
- isBevoegd
- reden


# Mogelijkheden voor het bepalen van een bevoegdheid
Het bepalen of iemand 'bevoegd genoeg' is voor het afnemen van een service, is afhankelijk van de service. Het tekenen van contract zal een stricte bevoegdheid vereisen, maar toegang tot een groothandel zal misschien minder stricte bevoegdheid vereisen. 

Let wel, hoe stricter je de bevoegdheid interpreteert, hoe meer mensen je buitensluit. 

## Meest stricte interpretatie

```
isBevoegd == "Ja"
```
## Minst stricte interpretatie

```
isBevoegd == "Ja" || isBevoegd == "Niet vastgesteld"
```
## Voorbeeld van eigen interpretatie 1

```
isBevoegd == "Ja" || 
soortBevoegdheid === "Gezamenlijk bevoegd" ||
soortBevoegdheid === "Beperkt bevoegd" ||
typeVolmacht === "Beperkte volmacht"
```
## Voorbeeld van eigen interpretatie 2

```
isBevoegd == "Ja" || 
beperkingInEurosBevoegdheid >= 10000 ||
beperkingInGeldVolmacht >= 10000 
```
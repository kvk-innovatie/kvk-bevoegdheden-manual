## isBevoegd

Het dataveld ```isBevoegd``` kan drie waarden hebben:
* ```Nee```: in de volgende gevallen:
  * De inschrijving of de persoon heeft een beperking (zie hierboven)
* ```Ja```: in de volgende gevallen:
  * De inschrijving of de persoon heeft niet een beperking, en
  * De persoon is een eigenaar van een Eenmanszaak, of
  * De persoon is onbeperkt bevoegd voor een Samenwerkingsverband, of
  * De persoon is alleen/zelfstandig bevoegd voor een Rechtspersoon, of
  * De persoon heeft een volledige volmacht
* ```Niet vastgesteld```: In de gevallen dat isBevoegd niet 'Ja' of 'Nee' is. In dit geval bepaald de partij, die de bevoegdheid verifieert, zelf welke betrouwbaarheid hij voldoende acht. Hij kan daar de volgende datavelden voor gebruiken: (voor meer info over de velden, check de documentatie, tab rechtsboven)
    * soortBevoegdheid
    * beperkingInEurosBevoegdheid
    * overigeBeperkingBevoegdheid
    * isBevoegdMetAnderePersonen
    * typeVolmacht
    * beperkingInGeldVolmacht
    * beperkingInHandelingVolmacht
    * heeftOverigeVolmacht
    * omschrijvingOverigeVolmacht
    * magOpgaveHandelsregisterDoen
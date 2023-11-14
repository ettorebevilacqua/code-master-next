# monadi functor and friends : Container

La pentola, il piatto, il vassoio, il cesto della lavatrice cosa hanno in comune ?
sono contenitori, il loro scopo è contenere qualcosa, non importa cosa, se metto i vestiti nella pentola,
e il cibo nella lavatrice, dal loro punto di vista funzionale, non cambiano le cose, svolgeranno sempre la loro funzione di contenere qualcosa.

questi sono i container per analogia nella programmazione funzionale, particolare che ci interessa per rimanere nalla analogia, è che per usare cosa contengono, devo aprire la lavatrice, sollevare il coperchio, mangiare cosa è contenuto nel piatto, senza queste azioni non servono a nulla, i contenitori che si limitano a non far disperdere il contenuto, come detto il loro unico scopo utile e indispensabile di esistere.

nella programmazione come contenitore conosciuto e largamente utilizzato abbiamo le promise ma attenzione :

Qui non si vuole insegnare cosa sono le promise, nel caso consiglio per chi ha idee poco chiare di studiarle, ma si vuole puntualizzare le cose, quello che ci interessa è mettere in chiaro i comportamenti e le motivazioni per il loro uso, che ci servono per capire i loro cugini chiamati più in generale contenitori, come la pentola o il piatto, rimanendo nella analogia della cucina.

```js
const myPromise = new Promise((resolve, reject) => {
  const startTime =  Date.now()
  console.log('start promise ')
  setTimeout(() => {
    console.log('resolve promise in ms ',  Date.now() - startTime)
    resolve(64)
  }, 300)
});

const newPromiseOfHalf = myPromise.then(num =>  num / 2  )
// stampa la definizione della promise ([object Promise]), no il valore 5.
console.log('promise =', myPromise.toString() )
// qui stampa il valore 5
newPromiseOfHalf.then(ris => console.log('risultato = ', ris))
```

Dentro a new Promise, abbiamo messo un valore che viene popolato con un certo ritardo, questo in quanto la promise è fatta per gestire valori futuri.

Ma se provo a stamparla, mi restituisce la sua definizione non il valore inzialmente non esistente ma dopo 300ms di valore 10, appunto in quanto promise un valore futuro.

Quello che ci interessa è che dobbiamo passare una funzione per visualizzare il valore :
newPromiseOfHalf.then(ris => console.log(ris))

come dire, non mangio la pentola o il piatto perchè contiene cibo, come non mi vesto del cestello della lavatrice perchè contine i vestiti li devo estrapolare.

***La difficoltà iniziale della promise***

Le promise sono al inizio un po ostiche da comprendere, ma poi le utilizziamo a occhi chiusi, e questo in realtà in genere senza conoscerle a fondo, non cè bisogno di vedere come sono implementate.

Allo stesso modo nella programmazione funzionale in concetto di monadi o funturi, provocano la stessa difficoltà nel comprenderle, quale è il problema ??

***L' abitudine mentale***, ragionare come si è imparato a programmare, in modo imperativo cioè una sequenza lineare di istruzioni, allo stesso modo le funzioni map e reduce degli array che anticipo si comportano anche loro come contenitori come le promise.

Provate a fare mente locale quando le avete viste le prime volte, come anche map, reduce, filter ecc.

La cosa importante è fare chiarezza, il vantaggio della programmazione funzionale è il suo stile dichiarativo e possiamo subito fare l esempio aggiustando il codice scritto :

```js
const logVal =(descr, val)=>console.log(`${descr} ${val || ''}`)
const timeDiff = (startTime) =>  Date.now() - startTime
const afterTimeout = (resolve, startTime)=>{
 logVal('resolve promise in ms', timeDiff(startTime))
  resolve(64)
}

const getHalfValue = (a)=>a / 2

const myPromise = new Promise((resolve, reject) => {
  const startTime =  Date.now()
  logVal('start promise ')
  setTimeout(() => afterTimeout(resolve, startTime), 300)
});

const newPromiseOfHalf = myPromise.then(getHalfValue)
newPromiseOfHalf.then(ris => logVal('risultato = ', ris))
```

quello che mi interessa è la definizione della promise più semantica evitando annidazioni.
e in particolare l' espressione:

myPromise.then(halfValue) che si dovrebbe leggere :
quando hai risolto il valore futuro, ALLORA (then) dammi il mezzo valore


Ho scritto 2 funzioni specifiche in particolare
myPromise.then(num => num / 2  )
.then(num => num / 2)
.then(num => num / 2)
.then(ris => console.log('risultato = ', ris))

myPromise.then(num => num / 0   ).then(ris => console.log('risultato err = ', ris))

const divBy0 = 10 / 0
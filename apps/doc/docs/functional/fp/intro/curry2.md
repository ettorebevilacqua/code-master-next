# il curry delle funzioni

## codice di esempio

Definiamo una promise che restituisce il valore 64 dopo un certo tempo e calcoliamo la sua metà :

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
// qui stampa il valore 5
newPromiseOfHalf.then(ris => console.log('risultato = ', ris))
```

cerchiamo di evitare le annidazione in modo che la definizione della promise sia più lineare.
e più coinciso il then della promise.

```js

const logVal =(descr, val='')=>console.log(`${descr} ${val}`)
const timeDiff = (startTime) =>  Date.now() - startTime
const afterTimeout = (resolve, startTime)=>
    logVal('resolve promise in ms ', timeDiff(startTime))


const myPromise = new Promise((resolve, reject) => {
  const startTime =  Date.now()
  logVal('start promise ')
  setTimeout(() => afterTimeout(resolve, startTime), 300)
  resolve(64)
});

const newPromiseOfHalf = myPromise.then(getHalfValue)
newPromiseOfHalf.then(ris => logVal('risultato = ', ris))
```

Di tutto il codice scritto, quello che interessa nella sua lettura è :

myPromise.then(halfValue)

che si  legge data la nomenclatura scelta :
quando hai risolto il valore futuro, ALLORA (then) dammi (get) il mezzo (half) valore

il codice che precede sono i suoi dettagli, questi mi interessano solo se devo cambiare i comportamenti precedenti.

Ma rendiamolo più elegante :

```js
const getHalfValue = (a)=>a / 2
const logVal =(descr) => (val='') => console.log(`${descr} ${val}`)
const timeDiff = (startTime) =>  Date.now() - startTime
const afterTimeout = (resolve, startTime) =>() => {
    logVal('resolve promise in ms ')(timeDiff(startTime))
    resolve(64)
}

const myPromise = new Promise((resolve, reject) => {
  logVal('start promise ')
  setTimeout(afterTimeout(resolve,  Date.now()), 300)
});

const newPromiseOfHalf = myPromise.then(getHalfValue)
newPromiseOfHalf.then(logVal('risultato = '))
```

come dicevamo quello che mi interessa è leggere sono le ultime righe per capire cosa succede

const newPromiseOfHalf = myPromise.then(getHalfValue)
newPromiseOfHalf.then(logVal('risultato = '))

il contenuto della then per visualizzare il risultato è più coinciso rispetto a :
newPromiseOfHalf.then(ris => logVal('risultato = ', ris))

ma notiamo allo stesso modo setTimeOut cambia da
setTimeout(() => afterTimeout(resolve, startTime), 300)

diventa :
setTimeout(afterTimeout(resolve, startTime), 300)

abbiamo eliminato () => che precede afterTimeout

come si dice abbiamo tolto rumore nel codice, le mie funzioni tendono a stare su una o due righe e se posso evito le graffe {} nella promise ho passato direttamente Date.now che nella prima implementazione dovevo metterla in una variabile.

rivediamo come cambia la definizione della promise :

```js
const myPromise = new Promise((resolve, reject) => {
  const startTime =  Date.now()
  console.log('start promise ')
  setTimeout(() => {
    console.log('resolve promise in ms ',  Date.now() - startTime)
    resolve(64)
  }, 300)
});
```

```js
const myPromise = new Promise((resolve, reject) => {
  logVal('start promise ')
  setTimeout(afterTimeout(resolve,  Date.now()), 300)
});
```

stiamo più chiaramente dicendo:
log di start promise,
dopo il timeout di 300ms, risolvi la promise con il time attuale.

cosa abbiamo fatto per esempio con :
newPromiseOfHalf.then(logVal('risultato = '))

abbiamo passato la funzione logVal definita come :

const logVal = (descr) => (val='') => console.log(`${descr} ${val}`)

da notare come ho passato i parametri
  (descr) => (val='') => ...

piuttosto che
(descr, val='') => ...

in altre parole, viene passato descr che restituisce di nuovo una funzione che prende il valore da visualizzare.

I miei parametri ora sono singoli, separati da una funzione nel mezzo
posso anche scrivere più tradizionalmente per vedere la funzione che restituisce una funzione in questo modo meno coinciso :

```js
function logVal(descr) {
    return function(val=''){
        console.log(`${descr} ${val}`)
    }
}
```

logVal restisce chiaramente una funzione che prende il parametro del valore, ma la cosa importante è
che descr il messaggio da visualizzae, dentro la funzione interna preserva il suo valore.
Questo è dato da come javascript gestisce lo scope cioè la visibilità delle variabili, in questo caso i valori passati.

Questo viene chiamato il curry delle funzioni, cioè funzioni che restituiscono funzioni con i paramentri che vengono "ricordati" grazie allo scope.

Facciamo un altro esempio per abituarci alla lettura delle funzioni curry

```js
function logVal(descr) {
    const preMessage = '  -> '
    return function(val=''){
        console.log(`${preMessage} ${descr} ${val}`)
    }
}

logVal('valore=')(5)
```

ad ogni messagio voglio che ciene preceduto da -> con rientro :
visalizzando con rieentro di 2 spazi :
  -> valore=5

ma attenzione, ora ho dovuto scrivere:
logVal('valore=')(5)

come potete notare chiamandola direttamente, ho dovuto mettere le doppie parentesi per ogni parametro,
piuttosto che tipicamente e più elegantemente logVal('valore=', 5)

se abbiamo capito ora proviamo a scrivere getHalfValue più in generale, cioè che permette di dividere non più in modo rigido per 2 ma per qualsiasi valore :

```js
const divide = (divisore) => (dividendo) => dividendo / divisore
const getHalfValue = divide(2)

const ris1 = divide(2)(10) // ris1 = 5
const ris2 = getHalfValue(10) // ris2 = 5
```

***quindi quando utilizzare il curry delle funzioni ??***

come possiamo vedere dal esempio, divide è la funzione generale di divisione
ma ho anche definto getHalfValue preparata con il primo paramentro della prima funzione con 2 :
const getHalfValue = divide(2)

Attenzione quindi ! getHalfValue non restituisce un valore ma una funzione preparata con il parametro 2 nel divisore, non a caso prima passo divisore in divide e poi dividendo, l ordine dei parametri passati è importanti se voglio come abbiamo fatto specializzre le funzioni partendo da una più generica di base.

vediamo con la moltiplicazione 

```js
const multipli = (a) => (b) => a * b
const double = multipli(2)

const ris1 = multipli(2)(10) // ris1 = 20
const ris2 = double(10) // ris2 = 10
```

in questo caso ho chiamato a e b più generali i paramentri, dato che l' ordine dei fattori nella moltiplicaione non è importante grazie alla proprietà transitiva, nella divisione anche come scopo di chiarezza didattica li ho chiamati dividendo e divisore che come nella sotrazione l ordine è importante.

***quindi quando utilizzare il curry delle funzioni ??***

Di nuovo la stessa domanda... nei casi precedenti ho fatto notare come possono essere utili per specializzare dei comportamenti più generici delle funzioni.

ma il motivo principale in questo esempio e molto tipicamente utilizzato è questo :
const newPromiseOfDouble = myPromise.then(double)

come detto piuttosto che scrivere
myPromise.then((num)=>double(num))

o anche senza curry :

```js
const multipliNoCurry =  (a, b) => a * b
myPromise.then((num)=>multipliNoCurry(num, 2))
```

```js
const multipli = (a) => (b) => a * b
const double = multipli(2)

const multipliNoCurry =  (a, b) => a * b
myPromise.then(double)
```

La promise fa qualcosa (con resolve) quando un evento la scatena nel nostro esempio con setTimeout :

```js
const multipli = (a) => (b) => a * b
const double = multipli(2)

 const myPromise = new Promise((resolve, reject) => {
   setTimeout(() => resolve(10)), 300)
    }
mypromise.then((num10)=>double(num10)) // resolve(10) passa alla then il valore 10 nella variabile num10
// scritta più coincisa :
mypromise.then(double) // qui passo una funzione che prende un solo parameetro possiamo vedere sopra

// ma se voglio utilizzare multipli senza definire double la chiamo passando  il primo parametro :
mypromise.then(multipli(2))
```

resolve è la callBack che passiamo myPromise.then che appunto prende una funzione di callBack,
la callback accetta un solo parametro, nel primo esempio num10.
nel secondo esempio, gli passiamo la funzione double che prende un solo parametro !!

ma attenzion nel terzo esempio  se non voglio definire double, gli passiamo la funzione multipli che prende un parametro e restituisce una funzione che prende di nuovo sempre e un solo parametro.

quello che è importante notare, che se voglio passare direttamente una funzione alla then senza definirla come :
then((valoreFuturo)=> faQualcosa(valoreFuturo))

la funzione passata deve essere compatibile, cioè deve ricevere un solo parametro.

***Come mai definisco multipli piuttosto che fare la banale moltiplicazione ??***

giustamente si potrebbee obbiettare che si diceva di essere coincisi ma se scrivo :
then((valoreFuturo)=> valoreFuturo * 2)

non faccio prima ?? tutto questo per evitare (valoreFuturo)=> che posso scrivere (val)=> ??

Potrei rispondere che è a scopo didattico, pensate a funzioni più complesse, anche di poco con l esempio iniziale :

```js
const myPromise1 = new Promise((resolve, reject) => {
  const startTime =  Date.now()
  console.log('start promise ')
  setTimeout(() => {
    console.log('resolve promise in ms ',  Date.now() - startTime)
    resolve(64)
  }, 300)
});
```

separo il codice dentro alla promise rendedola meno annidata e più lineare,

```js
const afterTimeout = (resolve, startTime) => () => {
    logVal('resolve promise in ms ')(timeDiff(startTime))
    resolve(64)
}

const myPromise2 = new Promise((resolve, reject) => {
  logVal('start promise ')
  setTimeout(afterTimeout(resolve,  Date.now()), 300)
});

```

ma attenzione qui è più importante la nomenclatura per la leggibilità piuttosto che scrivere in modo più dichiarativo passaggio dopo passaggio, per esempio :

setTimeout(pippo(resolve,  Date.now()), 300)

***Mantenibilità del codice !!***

ma se andate spulciare il codice in giro, non difficilemente trovate double, multipli, divide, sum
piuttosto che val * 2, a * b, a/b, a + b, che sono espressioni e non funzioni

facendo in questo modo poi trovo il codice come

```js
const multipli = (a) => (b) => a * b
const divide = (b) => (a) => a / b // operatori inveriti !! vedi sopra.
const sum = (a) => (b) => a + b
const inc =  (a) => sum(1)
const dec =  (a) => sum(-1)
const double = multipli(2)
const half = divide

myPromise
    .then(double)
    .then(sum(4))
    .then(multipli(3))

[1,2,3,4,5]
    .map(double)
    .map(inc)
    .map(half)
    .map(dec)
```

Come possiamo vedere come primo aspetto è che riutilizziamo le stesse funzioni in contesti diversi, ma che come già detto, tramite callBack che prendono un solo valore ( a esseree precisi, nel caso del map e il suo esempio che richiedono un solo valore di utilizzo)

il secondo se scriviamo


```js

[1,2,3,4,5]
    .map((val)=> val * 2)
    .map((val)=> val + 1)
    .map((val)=> val / 2)
    .map((val)=> val - 1)

[1,2,3,4,5]
    .map(double)
    .map(inc)
    .map(half)
    .map(dec)
```

quale delle due versioni è più leggibile ??
e se devo cambiare qualcosa a esempio incremntare a + 2 ?

```js
[1,2,3,4,5]
    .map(double)
    .map(sum(2))

// o anche

[1,2,3,4,5]
    .map(double)
    .map(inc(inc))
```

notarere inc(inc) fa sue volte l incremento, su lunghe operazioni mi sfugge di meno qualche mancato +1 da sostituire con +2. ma anche è più facile definire inc2 e fare con l editor la sostituzione del testo magari su molta porzione del codice, le funzioni devono avere nomi unici, quindi non possiamo sbagliare la sostituzione, allo stesso modo ***meglio la funzione inc2 che sum(2) o lo sfizioso per qualcuno inc(inc)***
o peggio provate a sostituire in automatico + 1 con + 2 su un codice molto corposo, potete immaginare i bug che possono generarsi se non si perde molto tempo a vedere se si è ben sostituito.

***evitiamo varibili globali***

proviamo a fare un timer di conto alla rovescia :

```js
let  x = 3

const countDown = ()=>
 setTimeout(()=>{
       console.log(x);
       x-- > 0 && countDown()
 } , 500)

 countDown(4)
```

questo stampa 4, 3, 2, 1, 0 ogni 500ms e si ferma
vediamola in altra versione :

```js
const timeOutCounter = (x) => () => {
  console.log(x, "s");
  x-- > 0 && setTimeout(timeOutCounter(x), 500);
};

timeOutCounter(3)()
```

nella prima versione devo usare una variabile esterna più globale e modificabile.

nella seconda versione inglobo la x, e non devo utilizzare nessuna variabile esterna, cosi facendo la stessa funzione timeOutCounter si dice mantiene il suo stato interno, con lo stesso vantaggio delle classi, che diveersamente avrei dovuto utilizzare queste se volevo avere un risultato simile per evitare variabili esterne.

Ricordo con l occasione, di cercare di evitare variabili esterne e quando possibile usare variabili costanti, evitare come la peste varibili modificabili con let, dove con il buona pproccio funzionale quasi mai cè tale bisogno, motivo per cui si utilizzano funzioni come map piuttosto ch il tradizionale for.

***Utilizzo più tipico nel web design***

Un altro esempio tipico di curry, è una pulsantiera nello sviluppo web
un pulsante prende una action, la action la definiamo come funzioni senza parametri

```jsx

const action = (actionName) =()=>log('action', actionName)

[<button onclick={ () => action('add')() } />, <button onclick={ action('remove') } />, <button onclick={ action('reset') } />  ]
```

in questo caso onclick prende una funzione, che si "ricorda" con il curry, vediamo il primo pulsante

```js
onclick={ () => action('add')() }
onclick={ action('remove') } />

```

nel primo caso con () => action('add')() chiamo la funzione con add, ed eseguo con () quella restituita,
in questo caso mi trovo quindi a chiamare qualcosa con due volte le parentesi action('add')()

nel secondo caso, action('remove') passo la funzione ()=>log('action', actionName) che al click verra chiamata come callBack()
dentro alla funzione onClick del dom del browser che non ci riguarda.

actionName in questo caso viene "ricordato" come variabile catturata dal contesto

se invece dobbiamo definire un serie di pulsanti tipicamente su una lista :

```js
const users = [
    {name: 'paolo', city:'padova'},
    {name: 'mattia', city:'roma'}
    {name: 'roberto', city:'milano'}
]

const whoIsTheUserClicked=(user)=>console.log(user)

users.map((user, index)=>{
    return (
    <div key={index} onclick={ (event) => whoIsTheUserClicked(user) } >
        {user.name}, {user.city}
    </div>
    )
}
```

scritta meglio come :

```js
const whoIsTheUserClicked=(user)=>()=>console.log(user)

users.map((user, index)=>{
    return (
    <div key={index} onclick={ whoIsTheUserClicked(user)} >
        {user.name}, {user.city}
    </div>
    )
}
```

onclick è una funzione che ha come parametro l evento dom, che a noi non interessa.
Nel secondo caso passo una funzione whoIsTheUserClicked che restituisce una funzione con paramentro vuoto. 

Come sempre whoIsTheUserClicked "ricorda" user nella second funzione restituita, quindi al click, onclick chiama whoIsTheUserClicked(user) passando il suo valore di evento che non utilizziamo perchè ci interessa il valore user, di fatto  onclick={ whoIsTheUserClicked(user)} diventa  ()=>console.log(user) ma con user "ricordato".

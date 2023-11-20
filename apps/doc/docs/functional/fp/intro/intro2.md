# Gentilissima introduzione alle monadi

## Partiamo dal difficile

Il concetto di monadi generalmente rimane molto ostico da comprendere, in questo articolo vogliamo rendere questa spiegazione quanto più semplice.
In genere questo argomento viene spiegato dopo aver spiegato diversi concetti di base della programmazione funzionale, per esempio le funzioni pure, il curry ecc
Qui partiamo subito con il concetto più avanzato.
A mio avviso trattato subito come argomento, è possibile argomentarlo senza particolare propedeuticità iniziale.

## I contenitori

La pentola, il piatto, il vassoio, il cesto della lavatrice cosa hanno in comune ?
sono contenitori, il loro scopo è contenere qualcosa, non importa cosa, se metto i vestiti nella pentola,
e il cibo nella lavatrice, dal loro punto di vista funzionale, non cambiano le cose, svolgeranno sempre la loro funzione di contenere qualcosa.

Per usare cosa contengono, devo aprire la lavatrice, sollevare il coperchio, mangiare cosa è contenuto nel piatto, senza queste azioni non servono a nulla.

nella programmazione funzionale, abbiamo i contenitori, in genere ostici da comprendere, ma rimanendo nella analogia, essi servono per contenere un valore,
dove mi serve poterlo inserire, fare qualcosa dentro il contenitore e aprirlo per restituirlo.

### Le Promise

Un esempio di questo concetto che dovrebbe essere famigliare in javascript è la promise, che fa da contenitore di valori :

```js
const myPromise = new Promise((resolve, reject) => {
const startTime = Date.now()
console.log('start promise ')
setTimeout(() => {
console.log('resolve promise in ms ', Date.now() - startTime)
resolve(64)
}, 300)
});

const newPromiseOfHalf = myPromise.then(num => num / 2 )
// stampa la definizione della promise ([object Promise]), no il valore 5.
console.log('promise =', myPromise.toString() )
// qui stampa il valore 5
newPromiseOfHalf.then(ris => console.log('risultato = ', ris))
```

Dentro a new Promise, abbiamo messo un valore che viene popolato con un certo ritardo, questo in quanto la promise è fatta per gestire valori futuri.
Ma se provo a stamparla, mi restituisce la sua definizione che fa da contenitore, come se vedessi la pentola e non cosa contiene.

Quello che ci interessa è che dobbiamo passare una funzione per visualizzare il valore :

***newPromiseOfHalf.then(ris => console.log(ris))***

come dire, non mangio la pentola o il piatto perchè contiene cibo, come non mi vesto del cestello della lavatrice perchè contine i vestiti li devo aprire per utilizzare il loro contenuto.

### La difficoltà iniziale della promise

Le promise sono al inizio un po ostiche da comprendere, ma poi le utilizziamo senza problemi, anche se non conosciamo i dettagli implementativi.

Allo stesso modo nella programmazione funzionale in concetto di monadi, provocano la stessa difficoltà nel comprenderle, quale è il problema ??

***L' abitudine mentale***, ragionare come si è imparato a programmare, in modo imperativo cioè una sequenza lineare di istruzioni, allo stesso modo gli array con le funzioni map e reduce si comportano anche loro come contenitori come le promise.

Partiamo con un esempio :

```js
const myPromise = Promise.resolve(64) // promise contiene il valore 64

divide = num =(num => num / 2)
myPromise
.then(divide) 32
.then(divide) 16
.then(divide) 8
.then(num => console.log('il risultato è', num )) // 8
```

vediamo in un altro modo la cosa :

```js
const newPromise = myPromise.then(divide) // restituisce una promise
newPromise.then(divide) // restituisce una promise dove il then successivo gli appartiene
.then(divide) 8
.then(num => console.log('il risultato è', num )) // 8
```

posso prendere il risultato della myPromise.then nella costante newPromise e da questa continuare come prima.

Cosa è importate da notare in questo esempio ?

- che le promise , restituiscono sempre promise , per questo posso concatenarle come successioni di operazioni.
- non uso direttamente il valore contenuto, ma una funzione che la utilizza.
- se proprio volessi usare il valore interno che è il parametro della funzione passata alla then, l esempio è il console.log

Questi sono i concetti più importanti di contenitore.

Proviamo a creare un contenitore che come la promise, restituisce sempre un contenitore che contiene un valore :

```js
const Container = x => ({
map: f => Container(f(x)), // qui definisco map che restitisce un container
toString: () => `${x}`,
})

const result = text => {
return Container(text)
.map(x => x.toUpperCase())
.map(x => x.trim())
.map(x => x.concat("- my cool brand"))
.toString()
} // Output: ["MY TEXT - my cool brand"];

```

Come vediamo, abbiamo creato una struttura con map e toString con una funzione. Il suo parametro iniziale fa da costruttore per contenere tale valore.

Nelle promise, possiamo concatenare una serie di them qui chiamate map, ugualmente alle then ***prendono una funzione e la applicano al valore INTERNO*** del container, in questo caso text. vediamo come ho definito map :

***map: f => Container(f(x))***

Map prende una funzione f, e restituisce di nuovo un container con f(x) il quale applica la funzione con il valore del contenitore, chiamato map.

Il gioco importante sta ***nel restituire un nuovo contenitore*** di uguale struttura ma con il valore trasformato dalla funzione map passata, il nuovo contenitore, a sua volta ha la funzione Map, allo stesso modo di come facevamo con le Promise con il suo then, che sarebbe il map con un altro nome più sensato al concetto di valore futuro delle promise, il concetto delle due è uguale, ripetiamo :

***applicare la funzione e restituire il contenitore.***

Ma questo codice si potrebbe dire, è poco utile, è solo più prolisso per fare una serie di trasformazioni su una stringa, nelle promise si giustifica il fatto che inizialmente non esiste il valore del contenitore come vengono qui invece inizializzati i Container.

### La monade maybe

vediamo ora un altro tipo di container questa volta più utile: la maybe :

```js
const isNullOrUndef = (value) => value === null || typeof value === "undefined";

const maybe = (value) => ({
isNothing: () => isNullOrUndef(value),
extract: () => value
});

const Maybe = {
just: maybe,
nothing: () => maybe(null)
};

const maybeNumberOne = Maybe.just("a value");
const maybeNumberTwo = Maybe.nothing();

console.log("Maybe.just is nothing?", maybeNumberOne.isNothing());
console.log("Maybe.nothing is nothing?", maybeNumberTwo.isNothing());
```

le cose ora sono un po cambiate rispetto al Container con map, la prima maybe restiuscie isNothing e extract

```js
const maybe = (value) => ({
isNothing: () => isNullOrUndef(value),
extract: () => value
});
```

Banalmente questo codice serve per restituire un booleano che dice se il valore value è nullo o meno. non abbiamo più il map, ma solo questa valutazione,senza di esso non posso accedere al valore interno, e quindi utilizziamo extract per poterlo utilizzare.

Successivamente la vediamo come se fosse nuovamente definita come Maybe con m grande :

```js
const Maybe = {
just: maybe,
nothing: () => maybe(null)
};
```

Da notare che just e nothing , ***restituiscono sempre lo stesso tipo di contenitore*** in questo caso maybe, nelle promise restituiscono sempre il tipo promise ed è questo che permette la concatenazione.

- Just restituisce una nuova istanza della maybe pronta per contenere un valore nel suo costruttore.
- Nothing invece restituisce una funzione senza parametri, al interno istanza una maybe con un valore null perché vogliamo rappresentare la mancanza di valori come suggerisce il suo nome.

qui un esempio del loro utilizzo :

```js
const maybeNumberOne = Maybe.just("a value");
const maybeNumberTwo = Maybe.nothing();
```

come vediamo just prende un valore e nothing nessuno.
possiamo poi interrogare se la maybe è nulla :

*console.log("Maybe.just is nothing?", maybeNumberOne.isNothing());*

Per ora quindi la maybe si limita a dirci se il valore inserito è nullo o meno, dal inglese May be = potrebbe essere.

Questo codice però non è di grande utilità, proviamo a ridefinirlo come container aggiungendo una funzione di map, che lo rende utile.

### la funzione di map nei container

Le promise dicevamo che sono container, quindi hanno il map, che però cambia il nome con then perché restituiscono valori futuri come dire : quando avrai il valore allora fa questo, il senso di map o then è lo stesso : "fai qualcosa", le funzioni "fanno qualcosa", allo stesso modo gli array hanno la funzione di map per trasformare tutti i suoi valori.

In altre parole facciamo qualcosa con questi valori con il map, ma precisiamo con il nome map non limitandoci a chiamarla funzione in modo più generico.

#### Definizione di map e le costanti

Diciamo che map ***trasforma i valori***, il nome viene dalla teoria degli insiemi : mappa un valore a un altro associato tramite una  funzione matematica, motivo del suo nome map.

Citiamo questa definizione senza addentrarci, in quanto per evitare confusione non ci interessa il dettaglio più teorico. ***consiglio di limitarsi a dire che map trasforma un valore e la chiamiamo funzione di trasformazione***, map per noi è sempre una funzione, ma il suo senso aderisce al concetto di funzione nella matematica.

#### usare le costanti

Caratteristica della programmazione funzionale è la ***trasformazione di valori costanti*** in altri valori costanti piuttosto che modificare la stessa variabile come siamo abituati a ragionare nella programmazione imperativa.

```js
// uso di variabili

let nome = 'Giulio'
nome = nome + ' Rossi'

// uso di costanti

const nome = 'Giulio'
const nomeCognome = nome + ' Rossi'
```

In questo esempio quello che cambia è che devo introdurre una nuova "variabile" costante. Il valore precedente viene mantenuto, ma il nuovo valore necessità di un nome che meglio descrive il **nuovo** valore, questo porta a una maggiore semantica e meno bug per errori di assegnazione, meno bisogno di commentare il codice dove se ben scritto si spiega da solo, in particolare il refactoring del codice è più agevole.

In questo esempio se dobbiamo poi riprendere solo il nome, dovrei cambiare la variabile let come ho fatto con le costanti con le variabili nome e nomeCognome, e poi modificare dove viene utilizzata la viariabile nome, se dimentichiamo qualcosa può portare a bug.

Diciamo che ***l uso di let in javascript dovrebbe essere limitato il più possibile***, in quanto sono fonte di bug.

Ora dovrebbe essere più chiaro perché utilizziamo il termine trasformare piuttosto che riassegnare.

### La nostra maybe con la funzione map

```js
const isNullOrUndef = (value) => value === null || typeof value === "undefined";

const maybe = (value) => ({
isNothing: () => isNullOrUndef(value),
extract: () => value,
map: (transformer) => isNullOrUndef(value) ? Maybe.nothing() : Maybe.just(transformer(value))
});

const Maybe = {
just: maybe,
nothing: () => maybe(null)
};

const a = { b: { c: "fp"} };

const maybeA = Maybe.just(a)
.map(a => a.b)
.map(b => b.c)
.map(c => c + " is great!");

console.log(maybeA.extract()); // fp is great S
```

vediamo subito il map introdotto :

***map: (transformer) => isNullOrUndef(value) ? Maybe.nothing() : Maybe.just(transformer(value))***

se il valore è :

- nullo restituisco Maybe.nothing() che quindi contiene il valore null e non più il valore passato.
- se non è nullo, applichiamo la funzione passata.

La cosa importante da sottolineare è che :

***La funzione del map, viene applicata solo se il valore non è nullo, se no non fa nulla non eseguendo la funzione.***

Un esempio con valori nulli :

```js
const a = { b: { c: "fp"} };

const maybeA = Maybe.just(a)
.map(a => a.b)
.map(b => b.c)
.map(c => c + " is great!");

console.log(maybeA.extract()); // fp is great S

const maybeB = Maybe.just(a)
.map(a => a.d) // a.d NON ESISTE !!!
.map(b => b.c)
.map(c => c + " is great!");

console.log(maybeB.extract()); // null
```

***Maybe.just(a).map(a => a.d)***  a.d non esiste , quindi restituisce Maybe.nothing()

nel successivo map  ***.map(b => b.c)*** che è  Maybe.nothing(), non viene applicata la funzione passata b => b.c come mai ??
riprendendo la definizione di map della maybe :

***map: (transformer) => isNullOrUndef(value) ? Maybe.nothing() : Maybe.just(transformer(value))***

il secondo map, che è in realtà la seconda "nuova" maybe restituita dal map della maybe precedente come Maybe.nothing(), al suo interno come contenitore ha il valore null, e quindi ***isNullOrUndef(value) ? Maybe.nothing()*** restituisce di nuovo Maybe.nothing(), e cosi a catena il successivo .map, che inevitabilmente sono tutte maybe con valore nullo, quindi tutte Maybe.nothing().

rivediamo con il commento di come vengono restituite ***nuove maybe*** dal map riga per riga :

```js
const a = { b: { c: "fp"} };

const maybeB = Maybe.just(a)
.map(a => a.d) // restituisce Maybe.nothing()
.map(b => b.c) // restituisce Maybe.nothing()
.map(c => c + " is great!"); // restituisce Maybe.nothing()

console.log(maybeB.extract()); // null
```

La cosa importante, è che la catena si ferma, in quanto nella biforcazione del map non viene eseguito il ramo ***Maybe.just(transformer(value))***  che applica la funzione transformer passata, e tutte le successive maybe create con .map saranno sempre nulle come Maybe.nothing()-

più precisamente, ***tutte le funzioni nei map successivi non vengono eseguite in presenza di valori null***, in questo modo non possiamo più generare errori per valori nulli, che tipicamente porta a bug nel programma !

Questo è l aspetto che ci interessa, la concatenazione di map eseguono un flusso di programma, il quale si ferma se trova valori nulli.

### a cosa serve quindi la maybe ??

La maybe permette una biforcazione del flusso, come fa la if, ma senza che devo scrivere codice che controlla valori null perchè lo fa al suo interno con il suo map restituendoci maybe di tipo nothing o just !!

***Importante è quindi vedere la maybe come due tipi che possono essere just o nothing***

diversamente avrei dovuto scrivere :

```js
const val1 = a.d

let val2=null
if (val1) {
val2 = val1
}

let val3=null
if (val2) {
val3 = val2
}

console.log(val3); // null

```

come cambia la leggibilità ? notare come devo ricorrere a variabili intermedie non più necessarie con la maybe che segue linearmente il flusso.

## il chaining di funzioni

Aggiungiamo queste 2 funzioni di utilità al codice precedente :

```js
const prop = (propName) => (obj) => obj[propName];
const append = (appendee) => (appendix) => appendee + appendix;

const a = { b: { c: "fp"} };

const val = prop('b')(a) // { c: "fp"}

// posso scrivere anche come :

const getPropB = prop('b')
const val = getPropB(a) //  { c: "fp"}

// se voglio accedere a c :
const getPropC = prop('c')

const val = getPropC(getPropB(a)) //   "fp"

```

Ho creto delle funzioni con un solo parametro che restituiscono funzioni per il resto dei singoli parametri,

***const val = getPropC(getPropB(a))***

getPropC riceve \{ c: "fp"} restituito da getPropB(a) , quindi legge il valore in c ce è "fp"

usando queste funzioni il codice precedente diventa :

```js
const a = { b: { c: "fp"} };

const prop = (propName) => (obj) => obj[propName];
const append = (appendee) => (appendix) => appendee + appendix;

const maybeA = Maybe.just(a)
    .map(prop("b"))
    .map(prop("c"))
    .map(append(" is great!"));

console.log(maybeB.extract()); // null
```

ora dentro  al primo map gli passo una funzione già definita pronta a leggere il membro b di un oggetto passato in quanto restituisce a sua volta una funzione che dato un oggetto legge il membro il b,  funzione come prima : a => a.b, che prende il parametro a, 

https://www.codingame.com/playgrounds/6272/building-a-maybe-in-javascript
https://www.programiz.com/javascript/online-compiler/
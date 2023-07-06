import shortid from "shortid";

export default {
  Query: {
    allBooks: (_, { search, take, skip, sortSelector, sortDescending }, { db }) => {
      const b = db.get("books").value();
      //Organizzazione della struttura dati da ritornare:
      //1) La struttura dati viene assegnata ad una variabile let perchè verrà modificata in base ai parametri passati
      //2) Si setta il valore di take perchè è fondamentale per il taglio della struttura dati per effettuare un eventuale paginazione
      //3) Se il parametro search è presente, allora la struttura dati viene filtrata in base al parametro
      //4) Se i parametri sortSelector e sortDescending sono presenti, allora la struttura dati viene ordinata in base ai parametri
      //5) La struttura dati viene tagliata in base ai parametri take e skip (per un eventuale paginazione)

      //PASSO 1
      let books = b;
      //PASSO 2
      //Il settaggio segue le seguenti specifiche:
      //Se take sommato a skip è maggiore della lunghezza della struttura dati, allora take assume il valore della lunghezza della struttura dati
      //Altrimenti take assume il valore di take + skip
      //Questo per gestire i casi in cui:
      //  - la paginazione scelta permette di visualizzare tutti i dati in una sola pagina CASE[take = b.length]
      //  - l'eventuale ultima page potrebbe contenere più dati di quelli che sono rimasti da visualizzare CASE[take = b.length]
      //  - la paginazione scelta non permette di visualizzare tutti i dati in una sola pagina CASE[take = take + skip]
      take = (take + skip)>b.length ? b.length : (take + skip);
      console.log(take);

      //Ricerca
      if (search) {
        books.value = books.filter((book) =>
          book.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      //Ordinamento
      if (sortSelector !== undefined && sortDescending !== undefined) {
        books = books.slice().sort((a, b) => {
          if (a[sortSelector] < b[sortSelector]) {
            return sortDescending ? 1 : -1;
          }
          if (a[sortSelector] > b[sortSelector]) {
            return sortDescending ? -1 : 1;
          }
          return 0;
        });
      }
     
      return books.slice(skip, take);
    },
    getBooksCount: (_, __, { db })=>{
      const books = db.get("books").value();
      return books.length;
    },
    getBook: (root, { id }, { db }) =>
      db
        .get("books")
        .find({ id })
        .value(),
  },

  Mutation: {
    addBook: (_, { input }, { pubsub, db }) => {
      const newBook = {
        id: shortid.generate(),
        title: input.title,
        description: input.description || "",
        rating: input.rating || null,
        year: input.year,
        author: input.author,
      };
      db.get("books")
        .push(newBook)
        .last()
        .write();

      pubsub.publish("books", { addBook: newBook });

      return newBook;
    },
    deleteBook: (_, { id }, { db }) => {
      db.get("books")
        .remove({ id })
        .write();

      return true;
    },
    updateBook: (_, { input }, { db }) => {
      const { id } = input;
      let bookToUpdate = db
        .get("books")
        .find({ id })
        .value();
      db.get("books")
        .find({ id })
        .assign({
          id,
          title: input.title || bookToUpdate.title,
          description: input.description || bookToUpdate.description,
          author: input.author || bookToUpdate.author,
          year: input.year || bookToUpdate.year,
          rating: input.rating || bookToUpdate.rating,
        })
        .write();
      return bookToUpdate;
    },
  },

  Subscription: {
    bookSub: {
      resolve: (payload) => {
        return payload.addBook;
      },
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator("books"),
    },
  },
};
